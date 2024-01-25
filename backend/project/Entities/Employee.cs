using project.Enums;

namespace project.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int ContractHours { get; set; }
        public Role Role { get; set; }
    }
}
