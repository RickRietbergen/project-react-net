using project.DataBase;
using project.Entities;
using project.Enums;
using project.Migrations;
using project.Models;
using project.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly DatabaseContext dataContext;
        private readonly IConfiguration configuration;
        private readonly JWTService jwtService;

        public AuthController(DatabaseContext dataContext, IConfiguration configuration)
        {
            this.dataContext = dataContext;
            this.configuration = configuration;
            jwtService = new JWTService(configuration.GetSection("AppSettings:Token").Value);
        }

        [HttpPost("register")]
        public async Task<ActionResult<Entities.Employee>> Register(EmployeeCreateModel model)
        {
            var user = await dataContext.Employees.Where(g => g.Username == model.Username).FirstOrDefaultAsync();

            if (user != null)
            {
                return BadRequest("Username is already in use.");
            }

            var newEmployee = new Entities.Employee();
            CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);

            newEmployee.Username = model.Username;
            newEmployee.PasswordHash = passwordHash;
            newEmployee.PasswordSalt = passwordSalt;
            newEmployee.ContractHours = model.ContractHours;
            newEmployee.Role = Role.werknemer;

            dataContext.Employees.Add(newEmployee);
            dataContext.SaveChanges();

            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(EmployeeLoginModel model)
        {
            var user = await dataContext.Employees.Where(g => g.Username == model.Username).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound("User was not found");
            }

            if (!VerifyPasswordHash(model.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Username or Password does not match");
            }

            return Ok(jwtService.CreateJWT(user));
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
