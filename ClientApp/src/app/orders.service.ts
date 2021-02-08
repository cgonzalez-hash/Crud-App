import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Order } from "./order";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    
  };
  private ordersUri: string = "api/Order"
  constructor(private http: HttpClient) { }
  getOrder(orderid:number):Observable<Order>{
    const url = `${this.ordersUri}/${orderid}`
    return this.http.get<Order>(url)
  }
  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.ordersUri)
  }
  deleteOrder(orderid: number):Observable<Order>{
    console.log("Service Deleting")
    const url = `${this.ordersUri}/${orderid}`
    console.log(url)
    return this.http.delete<Order>(url)
    
  }
  updateOrder(orderid: number, userid:string, orderdetails: string, ordertotal: string,shipped:boolean): Observable<Order>{
    const Order: Order = 
    {
    orderId: orderid,
    UserId: userid,
    OrderDetails: orderdetails,
    OrderTotal: ordertotal,
    Shipped: shipped
    
    };
  
    const url = `${this.ordersUri}/${orderid}/Edit`
    return this.http.put<Order>(url, Order)
  }
  
  postOrder(orderdetails: string, userid: string, ordertotal: string):Observable<Order>
  {
    const Order: Order = 
    {
      orderId: 0,
      UserId: userid,
      OrderDetails: orderdetails,
      OrderTotal: ordertotal,
      Shipped: false
    };
    return this.http.post<Order>(this.ordersUri, Order)
  }
}
