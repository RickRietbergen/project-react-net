using project.Entities;

namespace project.Models
{
    public class EmployeeEditModel
    {
        public string Name { get; set; }
        public int ContractHours { get; set; }
        public List<Planning> UpdatePlannings { get; set; }
    }
}
