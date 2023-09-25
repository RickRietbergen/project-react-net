using Microsoft.AspNetCore.Mvc;
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
    }
}
