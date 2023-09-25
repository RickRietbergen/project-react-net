namespace project.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Planning Planning { get; set; }
    }
}
