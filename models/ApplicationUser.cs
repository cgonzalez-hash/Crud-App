using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace crud_app_take2.Models
{
    public class ApplicationUser : IdentityUser
    {

        public ICollection<Order> Orders { get; set;}
        
        public ICollection<CartProduct> cartProduct {get; set;}
    }
}
