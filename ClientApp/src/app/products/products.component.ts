import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../products.service";
import { Product } from "../product";
import { CartproductService } from "../cartproduct.service";
import { AuthorizeService } from "../../api-authorization/authorize.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoadingService } from '../loading.service';
import { Observable, of } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];

  userid: string
  authorized_: Observable<boolean>
 

  constructor(private productService: ProductsService, 
    private cartProductService: CartproductService, private authService: AuthorizeService, 
    private _snackBar: MatSnackBar, private loaderService:LoadingService, private domsan:DomSanitizer) { }

  ngOnInit() {
    this.getProducts();
    this.authService.getUser().subscribe(_=> this.userid = _.sub);
    this.authorized_ = this.authService.isAuthenticated();
    
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(data=> { 
     this.products = data;

    })
  }
  getPhoto(Image: ArrayBuffer) {
    console.log(Image)
    let array = new Uint8Array(Image)
    const array_string = String.fromCharCode.apply(null,array)
    let base64 = btoa(array_string)
   let image = this.domsan.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64)
  return 'data:image/jpg;base64,' + Image;

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
