using Microsoft.AspNetCore.Mvc;
using project.DataBase;

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

        //[HttpGet]
        //public async Task<ActionResult> Get()
        //{

        //}
    }
}
