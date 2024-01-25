using project.Entities;

namespace project.Models
{
    public class EmployeeCreateModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public int ContractHours { get; set; }
    }
}
