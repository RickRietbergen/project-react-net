using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.DataBase;
using project.Entities;
using project.Models;

namespace project.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly DatabaseContext dataContext;
        public EmployeeController(DatabaseContext dataContext) 
        {
            this.dataContext = dataContext;
        }

        [HttpPost("EmpolyeeCreate")]
        public async Task<IActionResult> Post(EmployeeCreateModel model)
        {
            var newEmployee = new Employee
            {
                Name = model.Name,
                ContractHours = model.ContractHours,
                Planningen = new List<Planning>(),
            };

            await dataContext.Employees.AddAsync(newEmployee);
            await dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("DeleteEmployee/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await dataContext.Employees.FirstOrDefaultAsync(x => x.Id == id);

            if (employee == null)
            {
                return NotFound();
            }

            dataContext.Remove(employee);
            await dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
