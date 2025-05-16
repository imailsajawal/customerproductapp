using customerproductapp.Models;

namespace customerproductapp.Services
{
    public static class DataService
    {
        public static List<Customer> Customers = new()
        {
            new Customer { CustomerId = 1, Name = "Customer 1", Email = "abc@gmail.com" },
            new Customer { CustomerId = 2, Name = "Customer 2", Email = "xyz@gmail.com" }
        };

        public static List<Product> Products = new()
        {
            new Product { ProductId = 1, CustomerId = 1, ProductName = "Samsung Z fold", ProductPrice = 111 },
            new Product { ProductId = 2, CustomerId = 1, ProductName = "Samsung Z flip", ProductPrice = 222 },
            new Product { ProductId = 3, CustomerId = 1, ProductName = "Iphone 16", ProductPrice = 333 },
            new Product { ProductId = 4, CustomerId = 1, ProductName = "Nokia", ProductPrice = 444 },
            new Product { ProductId = 5, CustomerId = 1, ProductName = "Xiaomi", ProductPrice = 55 },
            new Product { ProductId = 6, CustomerId = 1, ProductName = "Huawei", ProductPrice = 666 },
            new Product { ProductId = 7, CustomerId = 2, ProductName = "Oppo", ProductPrice = 777 },
            new Product { ProductId = 8, CustomerId = 2, ProductName = "Nothing 2", ProductPrice = 888 }
        };
    }
}
