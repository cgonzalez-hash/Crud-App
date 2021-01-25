using System.Collections.Generic;

namespace crud_app_take2.Models {
     public class User {
         
        public long UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get ; set; }
        public string Address { get; set; }
        public bool Admin { get; set; }
        
        public ICollection<Order> Orders { get; set;}

    }
}

   

