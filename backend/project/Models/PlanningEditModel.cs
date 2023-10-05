using project.Entities;

namespace project.Models
{
    public class PlanningEditModel
    {
        public int Week { get; set; }
        public int Hours { get; set; }
        public int ProjectId { get; set; }
        public int EmployeeId { get; set; }
    }
}
