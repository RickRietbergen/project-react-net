using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var newProject = new Project
            {
                Name = model.Name,
            };

            await dataContext.Projects.AddAsync(newProject);
            await dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("DeleteProject/{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await dataContext.Projects.FirstOrDefaultAsync(x => x.Id == id);

            if (project == null)
            {
                return NotFound();
            }

            dataContext.Remove(project);
            await dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
