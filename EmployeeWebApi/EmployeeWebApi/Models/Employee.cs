using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EmployeeWebApi.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(50)]
        public string Position { get; set; }

        [Required]
        public decimal Salary { get; set; }

        [DataType(DataType.Date)]
        public DateTime HireDate { get; set; }

        [ForeignKey("DepartmentId")]
        public int DepartmentId { get; set; }
        public Department? Department { get; set; }
    }
}
