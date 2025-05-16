namespace customerproductapp.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal ProductPrice { get; set; }
    }
}
