import { Component, OnInit } from '@angular/core';
import { CartproductService } from "../cartproduct.service";
import { AuthorizeService } from "../../api-authorization/authorize.service";
import { CartProduct } from '../cartproduct';
import { Product } from "../product";
import { ProductsService } from "../products.service";
import { OrdersService } from "../orders.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoadingService } from "../loading.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { CartConfirmComponent } from "../cart-confirm/cart-confirm.component";
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
  cartProductId: number,  UserId: string,
  productId: number}>
  orderTotal: string;
  

  constructor(private cartProductService: CartproductService, private authService: AuthorizeService, private productService: ProductsService,
     private orderService: OrdersService, private _snackBar: MatSnackBar, public loaderService:LoadingService, private dialog: MatDialog) { }

  ngOnInit() {
     
   const auth = this.authService.getUser()
   .subscribe(
      (data) => {
          this.userid = data.sub
          this.getProduct();
      },
      (error) => {
        console.log('error getting user')
      }
    )
    auth.add(() => {
      console.log('done')
    })
  }
    
async getCart(): Promise<void> {
  
  this.cartProductService.getCartProduct(this.userid).subscribe(_=>{
    this.carts = _;
    this.filterProduct();
    this.orderTotal = this.cartProducts.map(a => a.price).reduce(function(a,b){
      return a + b
    }).toString();
    
  })
}
async getProduct(): Promise<void> {
 const subscription = this.productService.getProducts().subscribe(
    (data) => {
        console.log("products retreived")
        this.products = data
    },
    (error) => {
      console.log('error getting products')
    }
  )
  subscription.add(() => {
    this.getCart();
    console.log('done')
  })
  
}
openDialog() {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    total: this.orderTotal
  }

    const dialogRef = this.dialog.open(CartConfirmComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data !== undefined){
          this.checkOut()
        }});
  
  
}
deleteProduct(cartProductId: number): void {
const index = this.carts.indexOf(this.carts.find(_ => cartProductId === _.cartProductId))
this.cartProductService.deleteCartProduct(cartProductId).subscribe(t => this.carts.splice(index,1));

const cartProductsIndex = this.cartProducts.indexOf(this.cartProducts.find(_ => cartProductId === _.cartProductId))
this.cartProducts.splice(index, 1);

}
checkOut(): void {
  console.log("test")
  const ordertotal = this.cartProducts.map(a => a.price).reduce(function(a,b){
    return a + b
  }).toString();
  const orderdetails = JSON.stringify(this.cartProducts);
  console.log(ordertotal)
  const subscription = this.orderService.postOrder(orderdetails,this.userid,ordertotal).subscribe((data) => {
    console.log(data)
    this._snackBar.open('Order Placed Succesfully', 'Close', {
      duration: 5000,
    });


  },
  (error) => {
    console.log(error)
    this._snackBar.open('Failed to Place Order, Try Again', 'Close', {
      duration: 5000,
    });

  }
)
  subscription.add(() =>  {  
      console.log('Order Complete');
      this.cartProducts =[]
    this.carts.forEach(_ => {
      console.log(_.cartProductId)
      this.cartProductService.deleteCartProduct(_.cartProductId).subscribe();

    });
  });
  
}

 filterProduct(): void  {

  const newData = this.carts.map((item, row) => {
    const found = this.products.find((element) => item.productId == element.productsId);
    return { ...item, ...found };
 });
this.cartProducts = newData

}

}
