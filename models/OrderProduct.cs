using System.ComponentModel.DataAnnotations;
namespace crud_app_take2.Models {
    public class OrderProduct{
     
        [Key]
        public long OrderId { get; set;}
        [Key]
        public long ProductId { get; set;}
    }
}
