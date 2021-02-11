import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from "../products.service";
import { ProductsformComponent } from "../productsform/productsform.component";
import { OrderformComponent } from "../orderform/orderform.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { Order } from "../order";
import { OrdersService } from "../orders.service";
import { LoadingService } from '../loading.service';
import { MatTableDataSource } from "@angular/material/table";
import { Discount } from "../discount";
import { DiscountService } from "../discount.service";
import { TableColumnModel, TableComponent, TableConfig } from '@kla-shared/ngx-kla-material-core/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { OrderProductsproductService } from "../orderproduct.service";
import { OrderProducts } from "../orderproducts";


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
products: Product[];
orderProducts: OrderProducts[];
orderProdList: Array<{
  ProductName: string
  ProductQuantity: number
}> = [];
orders: Order[];
isComplete: boolean;
list: any[] = [];
ordersLength: number;
productsLength: number;
@ViewChild(TableComponent)
public dataSource: MatTableDataSource<Discount>;
public DiscountTypeColumnConfig: Array<TableColumnModel>;
public DiscountTypeTableConfig: TableConfig;
public lookupTypeTable: TableComponent;
public term:string;
opened: boolean;





  constructor(private productService: ProductsService, private dialog: MatDialog, 
    private orderservice: OrdersService, public loaderService:LoadingService, private discountService: DiscountService, 
    private orderProductService:OrderProductsproductService ) { }

  ngOnInit() {
    this.discountService.getDiscounts().subscribe((discount:Discount[]) => { 
        this.dataSource = new MatTableDataSource<Discount>(discount);
        this.initTable();
  })
  this.orderProductService.getOrderProducts().subscribe(_=> {
    this.orderProducts = _
  })
    this.getProducts();
    this.getOrders();
    
   
 
  }
  onChange(event: MatTabChangeEvent) {
    const tab = event.tab.textLabel;
    console.log(tab);
    if(tab==="Discounts")
    {
      console.log("Data source");
      console.log(this.dataSource)
      this.initTable();

     }
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
    console.log(this.products)
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
    }))
    console.log(index)

    
  const subscription = this.orderservice.deleteOrder(orderid).subscribe((data) => 
  {
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
getSideNavDetails(orderid: number){
  console.log(orderid)
  
  
  let productorder = this.orderProducts.filter(i=> i.orderId === orderid)
  let filtered = this.products.forEach(_ =>{
        productorder.forEach(order => {
      if(_.productsId === order.productId){
        console.log(_)
        
        if(this.orderProdList === undefined || this.orderProdList.length == 0){
          this.orderProdList.push({'ProductName': _.name, 'ProductQuantity': 1})
        }
        else {
          this.orderProdList.forEach(prodlist => {
            if(_.name === prodlist.ProductName){
              prodlist.ProductQuantity++
            }  
            else {
              this.orderProdList.push({'ProductName': _.name, 'ProductQuantity': 1})
            }
          })
        }  
      }
      this.opened = true;
    })
  })
console.log(this.orderProdList)

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
private async initTable(): Promise<void> {


  this.DiscountTypeColumnConfig = new Array<TableColumnModel>();
  this.DiscountTypeColumnConfig.push(new TableColumnModel("discountId", "Discount Id", false))
  this.DiscountTypeColumnConfig.push(new TableColumnModel("discountName", "Discount Name", false))
  this.DiscountTypeColumnConfig.push(new TableColumnModel("discountDescription", "Discount Description", false))
  this.DiscountTypeColumnConfig.push(new TableColumnModel("discountAmount", "Discount Amount", false))
  this.DiscountTypeTableConfig = new TableConfig(this.DiscountTypeColumnConfig, null, null)
  .setClientDataSource(this.dataSource)
  .setSortField("discountId")
  .setSortDirection("asc")
  .setRecordName("Discount Type")
  .setNoRecordsFoundMessage("Nothing found: There are no discounts to display.")
}


}
