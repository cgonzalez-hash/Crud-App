import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from "../products.service";
import { ProductsformComponent } from "../productsform/productsform.component";
import { OrderformComponent } from "../orderform/orderform.component";
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Order } from "../order";
import { OrdersService } from "../orders.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
products: Product[];
orders: Order[];
isComplete: boolean;

  constructor(private productService: ProductsService, private dialog: MatDialog, private orderservice: OrdersService ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void
   {
    this.productService.getProducts().subscribe(_ => this.products = _)
  }
  newProduct(name: string, price: number,description:string, quantity:number): void {
    this.productService.postProduct(name,price, description, quantity).subscribe(_ => this.products.push(_))
  }
  updateProduct(productid: number, name: string, description: string, price: number, quantity: number): void {
    const index = this.products.indexOf(this.products.find(_ => productid === _.productsId))
    this.productService.updateProduct(productid,name,price,description,quantity).subscribe(_ => {
      console.log(_)
      this.products[index] = _
    })

  }
  updateOrder(orderid: number, userid: number, orderdetails: string, ordertotal: number, shipped: boolean): void {
    const index = this.orders.indexOf(this.orders.find(_ => orderid === _.OrderId))
    this.orderservice.updateOrder(orderid,userid,orderdetails,orderdetails, shipped).subscribe(_ => {
      console.log(_)
      this.orders[index] = _
    })

  }
  deleteProduct(productid: number): void {
    const index = this.products.indexOf(this.products.find(_ => productid === _.productsId))
  console.log(index)
  this.productService.deleteProduct(productid).subscribe(t => this.products.splice(index,1));

  }
  deleteOrder(orderid: number): void {
    const index = this.orders.indexOf(this.orders.find(_ => orderid === _.OrderId))
  
  this.orderservice.deleteOrder(orderid).subscribe(t => this.orders.splice(index,1));

  }
  newOrder(orderdetails: string, ordertotal: string, ): void {
    this.orderservice.postOrder(orderdetails,ordertotal).subscribe(_ => this.orders.push(_))
  }
  openDialog(isProduct: boolean) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      isEdit: false
    }
    if (isProduct) {
      const dialogRef = this.dialog.open(ProductsformComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if(data !== undefined){
            this.newProduct(data.name, data.price, data.description, data.quantity)
          }});
    }
    else {
      const dialogRef = this.dialog.open(OrderformComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if(data !== undefined){
            this.newOrder(data.OrderDetails, data.OrderTotal)
          }});
    }
   

    
}


openDialogEditOrder(order: Order) 
{
  
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    isEdit: true,
    OrderId: order.OrderId,
    UserId: order.UserId,
    OrderDetails: order.OrderDetails,
    OrderTotal: order.OrderTotal,
    Shipped: order.Shipped
  }
  const dialogRef = this.dialog.open(OrderformComponent, dialogConfig)
  dialogRef.afterClosed().subscribe
  (
    data => 
    {
      if(data !== undefined)
      {
        if(data.isDelete === false)
        {
          console.log("saving")
          console.log(data)
          this.updateProduct(order.OrderId,data.UserId, data.OrderDetails, data.OrderTotal, data.Shipped)
        }
        else 
        {
          console.log("deleting")
          this.deleteProduct(order.OrderId)
        }

      }
    }
  )
}


openDialogEdit(product: Product) 
{
  console.log(product.productsId)
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    isEdit: true,
      ProductId: product.productsId,
      Name: product.name,
      Description: product.description,
      Price: product.price,
      Quantity: product.quantityAvailable
  }
  const dialogRef = this.dialog.open(ProductsformComponent, dialogConfig);
  dialogRef.afterClosed().subscribe
  (
    data => 
    {
      if(data !== undefined)
      {
        if(data.isDelete === false)
        {
          console.log("saving")
          console.log(data)
          this.updateProduct(product.productsId,data.name, data.description, data.price, data.quantity)
        }
        else 
        {
          console.log("deleting")
          this.deleteProduct(product.productsId)
        }

      }
    }
  );
}


}
