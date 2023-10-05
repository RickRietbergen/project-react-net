using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.DataBase;
using System.Globalization;
using System.Text.Json.Serialization;
using System.Text.Json;
using project.Models;
using project.Entities;
using System.Diagnostics;

namespace project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlanningController : ControllerBase
    {
        private readonly DatabaseContext dataContext;
        public int currentWeek = CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
        public PlanningController(DatabaseContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult> GetWeekWorkHours(int currentweek)
        {
            var employeeWorkHours = await dataContext.Planning
                .Include(p => p.Employee)
                .Include(p => p.Project)
                .Where(p => p.Week == currentWeek)
                .ToListAsync();
            
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                WriteIndented = true
            };

            var json = JsonSerializer.Serialize(employeeWorkHours, options);
            Debug.WriteLine(json);
            return Ok(json);
        }

        [HttpPost("PlanningCreate")]
        public async Task<IActionResult> CreatePlanning(PlanningCreateModel model)
        {
            var project = await dataContext.Projects.FindAsync(model.ProjectId);
            var employee = await dataContext.Employees.FindAsync(model.EmployeeId);

            if (employee == null || project == null)
            {
                return NotFound("Project or Employee not found.");
            }

            var planning = new Planning
            {
                Week = model.Week,
                Hours = model.Hours,
                Project = project,
                Employee = employee,
            };

            var result = await GetRemainingHours(planning.Employee.Id, model.Hours, model.Week);

            if (result)
            {
                await dataContext.Planning.AddAsync(planning);
                await dataContext.SaveChangesAsync();

                return Ok();
            }
            else
            {
                return BadRequest("Employee heeft niet genoeg contract uren om die persoon in te plannen.");
            }
        }

        [HttpPut("EditPlanning/{id}")]
        public async Task<IActionResult> EditPlanning(int id, [FromBody] PlanningEditModel model)
        {
            var selectedPlanning = await dataContext.Planning
                .Include(p => p.Project)
                .Include(p => p.Employee)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (selectedPlanning == null)
            {
                return NotFound();
            }

            selectedPlanning.Week = model.Week;
            selectedPlanning.Hours = model.Hours;

            if (model.projectName != null)
            {
                selectedPlanning.Project.Name = model.projectName;
            }
            if (model.employeeName != null)
            {
                bool hasEmployeeName = await dataContext.Employees.AnyAsync(x => x.Name == model.employeeName);

                if (hasEmployeeName)
                {
                    bool totalWorkHours = await dataContext.Employees.AnyAsync(x => x.ContractHours >= selectedPlanning.Hours);

                    if (totalWorkHours)
                    {
                        selectedPlanning.Employee.Name = model.employeeName;
                    }
                    else
                    {
                        return BadRequest("Werknemer heeft te weinig contract uren.");
                    }
                }
                else
                {
                    return NotFound();
                }
            }

            await dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("DeletePlanning/{id}")]
        public async Task<IActionResult> DeletePlanning(int id)
        {
            var planning = await dataContext.Planning.FirstOrDefaultAsync(x => x.Id == id);

            if (planning == null) 
            { 
                return NotFound();
            }

            dataContext.Remove(planning);
            await dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("AddWeek")]
        public async Task<ActionResult> AddWeek([FromBody] PlanningWeekModel model)
        {
            if (model.Week != null)
            {
                currentWeek = model.Week + 1;

                if (currentWeek == 53)
                {
                    currentWeek = 1;
                }

                var result = await GetWeekWorkHours(currentWeek);

                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPut("MinusWeek")]
        public async Task<ActionResult> MinusWeek([FromBody] PlanningWeekModel model)
        {
            if (model.Week != null)
            {
                currentWeek = model.Week - 1;

                if (currentWeek == 0)
                {
                    currentWeek = 52;
                }

                var result = await GetWeekWorkHours(currentWeek);

                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("GetRemainingHours")]
        public async Task<bool> GetRemainingHours(int id, int projectHours, int week)
        {
            var employee = await dataContext.Employees.FirstOrDefaultAsync(x => x.Id == id);

            if (employee == null)
            {
                return false;
            }

            var employeeHours = dataContext.Planning.Where(x => x.Employee == employee && x.Week == week).Sum(h => h.Hours);

            var totalHoursPlannedIn = employeeHours + projectHours;

            if (totalHoursPlannedIn > employee.ContractHours)
            {
                return false;
            }
            else
            {
                return true;
            }

        }
    }
}
