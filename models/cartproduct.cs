using System.ComponentModel.DataAnnotations.Schema;
namespace crud_app_take2.Models {
public class CartProduct {
     public long CartProductId { get; set; }
     public string UserId { get; set; }

     public long ProductId  {get; set; }
    
    [ForeignKey("UserId")]
     public ApplicationUser applicationUser { get; set; }
     

}

}