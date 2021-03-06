using crud_app_take2.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crud_app_take2.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Discount> Discount { get; set; }
        public DbSet<OrderProduct> OrderProduct { get; set; }
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<crud_app_take2.Models.CartProduct> CartProduct { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<OrderProduct>().HasKey(op=> new {op.OrderId, op.ProductId});
        
        }

        
    }
}
