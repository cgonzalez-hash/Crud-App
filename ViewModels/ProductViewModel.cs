using Microsoft.AspNetCore.Http;
namespace crud_app_take2.ViewModels {
    public class ProductViewModel {
    public long ProductsId { get; set; }

    public string Name { get; set; }
    public int Price { get; set; }
    public string Description { get; set; }
    public int QuantityAvailable { get; set; }
    public IFormFile Image { get; set; }


}}


