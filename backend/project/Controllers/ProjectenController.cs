using Microsoft.AspNetCore.Mvc;
using project.DataBase;
using project.Entities;
using project.Models;

namespace project.Controllers
{
    public class ProjectenController : Controller
    {
        private readonly DatabaseContext dataContext;

        public ProjectenController(DatabaseContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpPost("ProjectCreate")]
        public async Task<IActionResult> Post(ProjectCreateModel model)
        {
            var projectName = model.Name;

            var newProject = new Project
            {
                Name = projectName,
            };

            await dataContext.Projects.AddAsync(newProject);
            await dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
