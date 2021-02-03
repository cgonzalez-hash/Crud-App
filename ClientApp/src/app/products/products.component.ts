import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../products.service";
import { Product } from "../product";
import { CartproductService } from "../cartproduct.service";
import { AuthorizeService } from "../../api-authorization/authorize.service";
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  userid: string
 

  constructor(private productService: ProductsService, 
    private cartProductService: CartproductService, private authService: AuthorizeService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getProducts();
    this.authService.getUser().subscribe(_=> this.userid = _.sub);
    
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(_=>this.products = _)
  }
  addToCart(productid: number): void {
    console.log(this.userid)
    const subscription = this.cartProductService.postCartProduct(this.userid,productid).subscribe(
      (data) => {
        console.log(data)
        this._snackBar.open('Added to Cart Succesfully', 'Close', {
          duration: 5000,
        });

      },
      (error) => {
        console.log(error)
        this._snackBar.open('Failed to Add Item', 'Close', {
          duration: 5000,
        });

      }
    )
    subscription.add(() => console.log('complete'))
  }

}
