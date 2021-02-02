import { Component, OnInit } from '@angular/core';
import { CartproductService } from "../cartproduct.service";
import { AuthorizeService } from "../../api-authorization/authorize.service";
import { CartProduct } from '../cartproduct';
import { Product } from "../product";
import { ProductsService } from "../products.service";
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  userid: string;
  carts: CartProduct[];
  products: Product[];
  cartProducts: Array< {productsId: number,
  name: string,
  price: number,
  description: string,
  quantityAvailable: number,
  CartProductId: number,  UserId: string,
  productId: number}>
 

  constructor(private cartProductService: CartproductService, private authService: AuthorizeService, private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(_=>this.products = _)
    this.authService.getUser().subscribe(_=> {
      this.userid = _.sub
      console.log(_);
      this.getCart()
    })
    
    
  }
getCart(): void {
  
  this.cartProductService.getCartProduct(this.userid).subscribe(_=>{
    this.carts = _;
    console.log(this.carts);
    this.filterProduct();
  })
 
}
deleteProduct(cartProductId: number): void {
const index = this.carts.indexOf(this.carts.find(_ => cartProductId === _.CartProductId))
this.cartProductService.deleteCartProduct(cartProductId).subscribe(t => this.carts.splice(index,1));

const cartProductsIndex = this.cartProducts.indexOf(this.cartProducts.find(_ => cartProductId === _.CartProductId))
this.cartProducts.splice(index, 1);

}

filterProduct(): void  {

  const newData = this.carts.map((item, row) => {
    const found = this.products.find((element) => item.productId == element.productsId);
    return { ...item, ...found };
 });
 console.log(newData);
this.cartProducts = newData


}

}
