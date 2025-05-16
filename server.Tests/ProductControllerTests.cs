using Xunit;
using customerproductapp.Controllers;
using Microsoft.AspNetCore.Mvc;
using customerproductapp.Models;
using System.Collections.Generic;
using System.Linq;

namespace customerproductapp.Tests
{
    public class ProductControllerTests
    {
        private readonly ProductController _controller;

        public ProductControllerTests()
        {
            _controller = new ProductController();
        }


        [Fact]
        public void GetProductsByCustomer_InvalidId_ReturnsEmptyList()
        {
            var result = _controller.GetProductsByCustomer(999);
            var okResult = Assert.IsType<OkObjectResult>(result);

            var responseObj = okResult.Value;
            var totalProp = responseObj.GetType().GetProperty("Total");
            var productsProp = responseObj.GetType().GetProperty("Products");

            int total = (int)totalProp.GetValue(responseObj);
            var products = productsProp.GetValue(responseObj) as List<Product>;

            Assert.Equal(0, total);
            Assert.Empty(products);
        }

        [Fact]
        public void AddProduct_ValidProduct_ReturnsOkWithProduct()
        {
            var newProduct = new Product
            {
                CustomerId = 1,
                ProductName = "New Product",
                ProductPrice = 123.45M
            };

            var result = _controller.AddProduct(newProduct);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var createdProduct = Assert.IsType<Product>(okResult.Value);

            Assert.Equal(newProduct.ProductName, createdProduct.ProductName);
            Assert.Equal(newProduct.CustomerId, createdProduct.CustomerId);
            Assert.True(createdProduct.ProductId > 0);
        }

        [Fact]
        public void UpdateProduct_ValidId_ReturnsOkWithUpdatedProduct()
        {
            var productListResult = _controller.GetProductsByCustomer(1) as OkObjectResult;
            var products = productListResult.Value.GetType().GetProperty("Products").GetValue(productListResult.Value) as List<Product>;

            var productToUpdate = products.First();
            productToUpdate.ProductName = "Updated Product Name";
            productToUpdate.ProductPrice = 999.99M;

            var result = _controller.UpdateProduct(productToUpdate.ProductId, productToUpdate);
            var okResult = Assert.IsType<OkObjectResult>(result);
            var updatedProduct = Assert.IsType<Product>(okResult.Value);

            Assert.Equal("Updated Product Name", updatedProduct.ProductName);
            Assert.Equal(999.99M, updatedProduct.ProductPrice);
        }

        [Fact]
        public void UpdateProduct_InvalidId_ReturnsNotFound()
        {
            var fakeProduct = new Product
            {
                ProductId = 9999,
                CustomerId = 1,
                ProductName = "helllooooo",
                ProductPrice = 1.0M
            };

            var result = _controller.UpdateProduct(9999, fakeProduct);
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void DeleteProduct_ValidId_ReturnsNoContent()
        {
            var productToDelete = new Product
            {
                CustomerId = 1,
                ProductName = "Product to Delete",
                ProductPrice = 50.0M
            };
            var addResult = _controller.AddProduct(productToDelete) as OkObjectResult;
            var addedProduct = addResult.Value as Product;

            var deleteResult = _controller.DeleteProduct(addedProduct.ProductId);
            Assert.IsType<NoContentResult>(deleteResult);
        }

        [Fact]
        public void DeleteProduct_InvalidId_ReturnsNotFound()
        {
            var result = _controller.DeleteProduct(9999);
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
