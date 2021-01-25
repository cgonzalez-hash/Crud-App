using Microsoft.EntityFrameworkCore;
namespace crud_app_take2.Models
{
    public class CrudAppContext : DbContext
    {
        public CrudAppContext(DbContextOptions<CrudAppContext> options)
            : base(options)
        {         
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<User> Users { get; set; }
        
    }
}