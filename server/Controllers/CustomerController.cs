using Microsoft.AspNetCore.Mvc;
using customerproductapp.Services;

namespace customerproductapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            return Ok(DataService.Customers);
        }

        [HttpGet("{id}")]
        public IActionResult GetCustomer(int id)
        {
            var customer = DataService.Customers.FirstOrDefault(c => c.CustomerId == id);
            if (customer == null) return NotFound();
            return Ok(customer);
        }
    }
}
