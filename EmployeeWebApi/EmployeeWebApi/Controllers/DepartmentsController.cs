using EmployeeWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DepartmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            return await _context.Departments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(d => d.Id == id);
            if (department == null)
            {
                return NotFound();
            }
            return department;
        }

        [HttpPost]
        public async Task<ActionResult<Department>> CreateDepartment(Department department)
        {
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();
            return department;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, Department department)
        {
            if (id != department.Id)
            {
                return BadRequest();
            }
            _context.Entry(department).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(department);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
