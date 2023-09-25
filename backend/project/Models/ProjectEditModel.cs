using project.Entities;

namespace project.Models
{
    public class ProjectEditModel
    {
        public string Name { get; set; }
        public List<Planning> UpdatePlannings { get; set; }
    }
}
