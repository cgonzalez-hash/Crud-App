import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { OrderProducts } from "./orderproducts";

@Injectable({
  providedIn: 'root'
})
export class OrderProductsproductService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    
  };
  private ordersUri: string = "api/OrderProducts"
  constructor(private http: HttpClient) { }
  getOrderProduct(orderid:number):Observable<OrderProducts>{
    const url = `${this.ordersUri}/${orderid}`
    return this.http.get<OrderProducts>(url)
  }
  getOrderProducts():Observable<OrderProducts[]>{
    return this.http.get<OrderProducts[]>(this.ordersUri)
  }
  deleteOrderProducts(orderid: number):Observable<OrderProducts>{
    console.log("Service Deleting")
    const url = `${this.ordersUri}/${orderid}`
    console.log(url)
    return this.http.delete<OrderProducts>(url)
    
  }
  updateOrderProducts(orderId: number, productId: number): Observable<OrderProducts>{
    const OrderProducts: OrderProducts = 
    {
      orderId: orderId,
      productId: productId
    
    };
  
    const url = `${this.ordersUri}/${orderId}/Edit`
    return this.http.put<OrderProducts>(url, OrderProducts)
  }
  
  postOrderProducts(orderId: number, productId: number):Observable<OrderProducts>
  {
    console.log(orderId)
    const OrderProducts: OrderProducts = 
    {
      orderId: orderId,
      productId: productId
    };
    return this.http.post<OrderProducts>(this.ordersUri, OrderProducts)
  }
}
