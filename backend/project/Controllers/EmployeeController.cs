using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.DataBase;
using project.Entities;
using project.Models;

namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly DatabaseContext dataContext;
        public EmployeeController(DatabaseContext dataContext) 
        {
            this.dataContext = dataContext;
        }

        [HttpPost("EmployeeCreate")]
        public async Task<IActionResult> Post(EmployeeCreateModel model)
        {
            var newEmployee = new Employee
            {
                Name = model.Name,
                ContractHours = model.ContractHours,
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

        [HttpPut("UpdateEmployee/{id}")]
        public async Task<IActionResult> EditEmployee(int id, [FromBody] EmployeeEditModel model)
        {
            var employee = await dataContext.Employees.FirstOrDefaultAsync(x => x.Id == id);

            if (employee == null)
            {
                return NotFound();
            }

            employee.Name = model.Name;
            employee.ContractHours = model.ContractHours;
            //existingPlanning.Week = updatedPlanning.Week;
            //existingPlanning.Hours = updatedPlanning.Hours;

            //if (model.UpdatePlannings !=  null)
            //{
            //    foreach (var updatedPlanning in model.UpdatePlannings)
            //    {
            //        var existingPlanning = employee.Planningen.FirstOrDefault(p => p.Id == updatedPlanning.Id);
            //        if (existingPlanning != null)
            //        {
                        
            //        }
            //    }
            //}

            await dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> Get()
        {
            return Ok(await dataContext.Employees.ToListAsync());
        }
    }
}
