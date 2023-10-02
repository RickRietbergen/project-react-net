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
        public PlanningController(DatabaseContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult> GetWeekWorkHours()
        {
            int currentWeek = CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

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

        [HttpPut]
        public async Task<IActionResult> EditPlanning(int id, [FromBody] PlanningEditModel model)
        {
            var selectedPlanning = await dataContext.Planning.FirstOrDefaultAsync(x => x.Id == id);

            if (selectedPlanning == null)
            {
                return NotFound();
            }

            selectedPlanning.Week = model.Week;
            selectedPlanning.Hours = model.Hours;

            if (model.Projects != null)
            {
                selectedPlanning.Project.Name = model.projectName;
            }
            if (model.Employees != null)
            {
                selectedPlanning.Employee.Name = model.employeeName;
            }

            await dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
