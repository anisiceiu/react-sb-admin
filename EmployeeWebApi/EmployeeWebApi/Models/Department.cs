using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EmployeeWebApi.Models
{
    public class Department
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [JsonIgnore]
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
