using Microsoft.AspNetCore.Mvc;
using customerproductapp.Models;
using customerproductapp.Services;
using System.Linq;
using System.Collections.Generic;

namespace customerproductapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        [HttpGet("{customerId}")]
		public IActionResult GetProductsByCustomer(
			int customerId,
			int page = 1,
			int pageSize = 5,
			string sortBy = "ProductId",
			string sortOrder = "asc")
		{
			var productsQuery = DataService.Products.Where(p => p.CustomerId == customerId);
			productsQuery = SortProducts(productsQuery, sortBy, sortOrder);
			var total = productsQuery.Count();
			var products = productsQuery.Skip((page - 1) * pageSize).Take(pageSize).ToList();

			return Ok(new { Total = total, Products = products });
		}

		private IEnumerable<Product> SortProducts(IEnumerable<Product> products, string sortBy, string sortOrder)
		{
			bool ascending = sortOrder.ToLower() == "asc";

			return (sortBy.ToLower()) switch
			{
				"productid" => ascending ? products.OrderBy(p => p.ProductId) : products.OrderByDescending(p => p.ProductId),
				"productname" => ascending ? products.OrderBy(p => p.ProductName) : products.OrderByDescending(p => p.ProductName),
				"productprice" => ascending ? products.OrderBy(p => p.ProductPrice) : products.OrderByDescending(p => p.ProductPrice),
				_ => products.OrderBy(p => p.ProductId)
			};
		}
		
        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            product.ProductId = DataService.Products.Any() ? DataService.Products.Max(p => p.ProductId) + 1 : 1;
            DataService.Products.Add(product);
            return Ok(product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product updated)
        {
            var product = DataService.Products.FirstOrDefault(p => p.ProductId == id);
            if (product == null) return NotFound();

            product.ProductName = updated.ProductName;
            product.ProductPrice = updated.ProductPrice;
            return Ok(product);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = DataService.Products.FirstOrDefault(p => p.ProductId == id);
            if (product == null) return NotFound();

            DataService.Products.Remove(product);
            return NoContent();
        }
    }
}
