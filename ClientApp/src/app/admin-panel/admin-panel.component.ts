import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from "../products.service";
import { ProductsformComponent } from "../productsform/productsform.component";
import { OrderformComponent } from "../orderform/orderform.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { Order } from "../order";
import { OrdersService } from "../orders.service";
import { LoadingService } from '../loading.service';
//import { MatTableDataSource } from "@angular/material/table";
import { Discount } from "../discount";
import { DiscountService } from "../discount.service";
//import { TableColumnModel, TableComponent, TableConfig } from '@kla-shared/ngx-kla-material-core/table';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
products: Product[];
orders: Order[];
isComplete: boolean;
list: any[] = [];
ordersLength: number;
productsLength: number;
//@ViewChild(TableComponent)
//public dataSource: MatTableDataSource<Discount>;
//public DiscountTypeColumnConfig: Array<TableColumnModel>;
//public DiscountTypeTableConfig: TableConfig;
//public lookupTypeTable: TableComponent;
public term:string;





  constructor(private productService: ProductsService, private dialog: MatDialog, 
    private orderservice: OrdersService, public loaderService:LoadingService, private discountService: DiscountService ) { }

  ngOnInit() {
    this.getProducts();
    this.getOrders();
 
  }

  getProducts(): void
   {
    this.productService.getProducts().subscribe(_ => {
      this.products = _
      this.productsLength = this.products.length;
    })
  }
  async getOrders(): Promise<void> {
   const subscription = this.orderservice.getOrders().subscribe(  
      (data) => {
        this.orders = data
    },
      (error) => {
        console.log("Error")
      }
    )
    subscription.add(()=>{
      this.ordersLength = this.orders.length;
      console.log(this.orders)

    })
  }
  getDiscounts(): void {
    this.discountService.getDiscounts().subscribe((discount:Discount[]) => {
    
       // this.dataSource = new MatTableDataSource<Discount>(discount);
      
      //this.initTable();
    })
  }
  newProduct(name: string, price: number,description:string, quantity:number, image: File): void {
    console.log(image)
    this.productService.postProduct(name,price, description, quantity, image).subscribe(_ => this.products.push(_))
  }
  updateProduct(productid: number, name: string, description: string, price: number, quantity: number, image: File): void {
    const index = this.products.indexOf(this.products.find(_ => productid === _.productsId))
    this.productService.updateProduct(productid,name,price,description,quantity, image).subscribe(_ => {
      console.log(_)
      this.products[index] = _
    })

  }
  updateOrder(orderid: number, userid: string, orderdetails: string, ordertotal: number, shipped: boolean): void {
    const index = this.orders.indexOf(this.orders.find(_ => orderid === _.orderId))
    this.orderservice.updateOrder(orderid,userid,orderdetails,orderdetails, shipped).subscribe(_ => {
      console.log(_)
      this.orders[index] = _
    })

  }
  deleteProduct(productid: number): void {
    const index = this.products.indexOf(this.products.find(_ => {
      productid === _.productsId
      console.log
    }))
  console.log(index)
  this.productService.deleteProduct(productid).subscribe(t => this.products.splice(index,1));

  }
  deleteOrder(orderid: number): void {
    const index = this.orders.indexOf(this.orders.find(_ => {
      orderid === _.orderId
      console.log(_)
    }))
    console.log(index)
    console.log(this.orders)
    
  const subscription = this.orderservice.deleteOrder(orderid).subscribe((data) => 
  {
    console.log('data')
  },
    (error) => {
      console.log(error)
    }
  );
    subscription.add(()=>{
      this.orders.splice(index,1)
    })

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
            this.newProduct(data.name, data.price, data.description, data.quantity, data.image)
          }});
    }
    else {
      const dialogRef = this.dialog.open(OrderformComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if(data !== undefined){
            //this.newOrder(data.OrderDetails, data.OrderTotal)
          }});
    }
   

    
}


openDialogEditOrder(order: Order) 
{
  console.log(order)
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    isEdit: true,
    ord : order
  }
  const dialogRef = this.dialog.open(OrderformComponent, dialogConfig)
  dialogRef.afterClosed().subscribe
  (
    data => 
    {
      if(data !== undefined)
      {
        console.log(data)
        if(data.isDelete === false)
        {
          console.log("saving")
          console.log(data)
          this.updateOrder(order.orderId,data.UserId, data.OrderDetails, data.OrderTotal, data.Shipped)
        }
        else 
        {
          console.log("deleting")
          this.deleteOrder(data.orderId)
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
          this.updateProduct(product.productsId,data.name, data.description, data.price, data.quantity, data.Image)
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
/*private initTable(): void {

  this.DiscountTypeColumnConfig = [
  new TableColumnModel("DiscountId", "Discount Id", true),
  new TableColumnModel("DiscountName", "Discount Name", false),
  new TableColumnModel("DiscountDescription", "Discount Description", false),
  new TableColumnModel("DiscountAmount", "Discount Amount", false)
  ]
  this.DiscountTypeTableConfig = new TableConfig(this.DiscountTypeColumnConfig, "Discount","Discount")
  .setClientDataSource(this.dataSource as any)
  .setSelectable(false)
  .setShowSelectButtons(false)
  .setShowFirstLastButtons(true)
  .setSortField("DiscountId")
  .setSortDirection("asc")
  .setRecordName("Discount Type");

}*/


}
