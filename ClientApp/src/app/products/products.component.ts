import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../products.service";
import { Product } from "../product";
import { CartproductService } from "../cartproduct.service";
import { AuthorizeService, IUser } from "../../api-authorization/authorize.service";
import { User, UserManager, WebStorageStateStore } from 'oidc-client';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  userid: string
 

  constructor(private productService: ProductsService, private cartProductService: CartproductService, private authService: AuthorizeService) { }

  ngOnInit() {
    this.getProducts();
    this.authService.getUser().subscribe(_=> this.userid = _.sub);
    
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(_=>this.products = _)
  }
  addToCart(productid: number): void {
    console.log(this.userid)
    this.cartProductService.postCartProduct(this.userid,productid).subscribe(_ => console.log(_))
  }

}
