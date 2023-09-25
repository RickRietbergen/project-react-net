namespace project.Entities
{
    public class Planning
    {
        public int Id { get; set; }
        public int Week { get; set; }
        public int Hours { get; set; }

        public Project Project { get; set; }
        public Employee Employee { get; set; }
    }
}
