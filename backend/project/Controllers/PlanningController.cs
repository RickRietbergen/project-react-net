using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.DataBase;
using System.Globalization;
using System.Text.Json.Serialization;
using System.Text.Json;

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
                .Where(p => p.Week == currentWeek).ToListAsync();

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var json = JsonSerializer.Serialize(employeeWorkHours, options);

            return Ok(json);
        }
    }
}
