using Xunit;
using customerproductapp.Controllers;
using Microsoft.AspNetCore.Mvc;
using customerproductapp.Models;
using System.Linq;

namespace customerproductapp.Tests
{
    public class CustomerControllerTests
    {
        private readonly CustomerController _controller;

        public CustomerControllerTests()
        {
            _controller = new CustomerController();
        }

        [Fact]
        public void GetAllCustomers_ReturnsOkAndList()
        {
            var result = _controller.GetAllCustomers();
            var okResult = Assert.IsType<OkObjectResult>(result);
            var customers = Assert.IsAssignableFrom<System.Collections.Generic.List<Customer>>(okResult.Value);
            Assert.NotEmpty(customers);
        }

        [Fact]
        public void GetCustomer_ValidId_ReturnsOkAndCustomer()
        {
            var result = _controller.GetCustomer(1);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var customer = Assert.IsType<Customer>(okResult.Value);
            Assert.Equal(1, customer.CustomerId);
        }

        [Fact]
        public void GetCustomer_InvalidId_ReturnsNotFound()
        {
            var result = _controller.GetCustomer(999);
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
