namespace project.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ContractHours { get; set; }

        public List<Planning> Planningen { get; set; }
    }
}
