using Microsoft.EntityFrameworkCore;

using Web_Api.Models;

namespace Web_Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options)
        {
        }

        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<Product> Products { get; set; }


    }
}
