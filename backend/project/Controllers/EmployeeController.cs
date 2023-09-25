using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.DataBase;
using project.Entities;
using project.Models;

namespace project.Controllers
{
    public class EmployeeController : ControllerBase
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

            if (model.UpdatePlannings !=  null)
            {
                foreach (var updatedPlanning in model.UpdatePlannings)
                {
                    var existingPlanning = employee.Planningen.FirstOrDefault(p => p.Id == updatedPlanning.Id);
                    if (existingPlanning != null)
                    {
                        existingPlanning.Week = updatedPlanning.Week;
                        existingPlanning.Hours = updatedPlanning.Hours;
                    }
                }
            }

            await dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
