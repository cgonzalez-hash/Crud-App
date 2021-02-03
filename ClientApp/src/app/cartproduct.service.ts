import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { CartProduct } from "./cartproduct";

@Injectable({
  providedIn: 'root'
})
export class CartproductService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    
  };
  private cartUri: string = "api/cartproduct"
  constructor(private http: HttpClient) { }
  getCartProduct(cartproductid: string):Observable<CartProduct[]>{
    const url = `${this.cartUri}/${cartproductid}`
    return this.http.get<CartProduct[]>(url)
  }
  getCartProducts():Observable<CartProduct[]>{
    return this.http.get<CartProduct[]>(this.cartUri)
  }
  deleteCartProduct(cartproductid: number):Observable<CartProduct>{
    console.log("Service Deleting")
    const url = `${this.cartUri}/${cartproductid}`
    console.log(url)
    return this.http.delete<CartProduct>(url)
    
  }
  updateCartProduct(cartproductid: number,userid: string, productid: number): Observable<CartProduct>{
    const CartProduct: CartProduct = 
    {
      cartProductId: cartproductid,
      UserId: userid,
      productId: productid
    };
  
    const url = `${this.cartUri}/${cartproductid}`
    return this.http.put<CartProduct>(url, CartProduct)
  }
  
  postCartProduct(userid: string, productid: number):Observable<CartProduct>
  {
    const CartProduct: CartProduct = 
    {
      cartProductId: 0,
      UserId: userid,
      productId: productid
     
    };
    return this.http.post<CartProduct>(this.cartUri, CartProduct)
  }
}
