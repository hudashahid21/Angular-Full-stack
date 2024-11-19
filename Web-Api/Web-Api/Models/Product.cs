using System.ComponentModel.DataAnnotations;

namespace Web_Api.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }

        public int BrandId { get; set; }
        public virtual Brand Brands { get; set; }

    }
}
