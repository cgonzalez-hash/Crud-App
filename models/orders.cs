using System.ComponentModel.DataAnnotations.Schema;
namespace crud_app_take2.Models 
{
public class Order
{
    
    public long OrderId { get; set; }

    public long UserId { get; set;}
    public string OrderDetails { get; set; }
    public string OrderTotal { get; set; }
    public bool Shipped { get; set; }
    [ForeignKey("UserId")]
    public User User { get; set; }

}

}
