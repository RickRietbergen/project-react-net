using project.DataBase;
using project.Entities;
using project.Enums;
using project.Migrations;
using project.Models;
using project.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly DatabaseContext dataContext;
        private readonly JWTService jwtService;

        public AuthController(DatabaseContext dataContext, IConfiguration configuration)
        {
            this.dataContext = dataContext;
            jwtService = new JWTService(configuration.GetSection("AppSettings:Token").Value);
        }

        [HttpPost("register")]
        public async Task<ActionResult<Employee>> Register(EmployeeCreateModel model)
        {
            var user = await dataContext.Employees.Where(g => g.Username == model.Username).FirstOrDefaultAsync();

            if (user != null)
            {
                return BadRequest("Username is already in use.");
            }

            var newEmployee = new Employee();

            newEmployee.Username = model.Username;
            newEmployee.Password = model.Password;
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

            if (model.Password != user.Password)
            {
                return BadRequest("Username or Password does not match");
            }

            return Ok(new
            {
                token = jwtService.CreateJWT(user),
                user.Id,
                user.Username,
                user.Role,
            });
        }
    }
}
