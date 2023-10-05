namespace project.Models
{
    public class PlanningCreateModel
    {
        public int Week { get; set; }
        public int Hours { get; set; }
        public int ProjectId { get; set; }
        public int EmployeeId { get; set; }
    }
}
