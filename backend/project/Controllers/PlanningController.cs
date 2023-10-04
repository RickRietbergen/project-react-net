using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.DataBase;
using System.Globalization;
using System.Text.Json.Serialization;
using System.Text.Json;
using project.Models;
using project.Entities;

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
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var json = JsonSerializer.Serialize(employeeWorkHours, options);

            return Ok(json);
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
                selectedPlanning.Employee.Name = model.employeeName;
            }

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
                return NotFound();
            }
        }
    }
}
