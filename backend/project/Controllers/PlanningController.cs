using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.DataBase;
using System.Globalization;

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

            var employeeWorkHours = dataContext.Planning
                .Include(p => p.Employee)
                .Include(p => p.Project)
                .Where(p => p.Week == currentWeek)
                .GroupBy(r => new
                {
                    EmployeeId = r.Employee.Id,
                    EmployeeName = r.Employee.Name
                })
                .Select(w => new
                {
                    w.Key.EmployeeId,
                    w.Key.EmployeeName,
                    Projects = w.Select(r => new
                    {
                        ProjectId = r.Project.Id,
                        ProjectName = r.Project.Name,
                        HoursWorked = r.Hours
                    }).ToList()
                })
                .ToList();

            return Ok(employeeWorkHours);
        }
    }
}
