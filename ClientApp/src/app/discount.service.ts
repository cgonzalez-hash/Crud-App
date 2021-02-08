import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discount } from "./discount";
@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    
  };
  private discountUri: string = "api/Discount"
  constructor(private http: HttpClient) { }
  getDiscount(discountId: string):Observable<Discount[]>{
    const url = `${this.discountUri}/${discountId}`
    return this.http.get<Discount[]>(url)
  }
  getDiscounts():Observable<Discount[]>{
    return this.http.get<Discount[]>(this.discountUri)
  }
  deleteDiscount(discountId: number):Observable<Discount>{
    console.log("Service Deleting")
    const url = `${this.discountUri}/${discountId}`
    console.log(url)
    return this.http.delete<Discount>(url)
    
  }
  updateDiscount(discountId: number, discountName: string,discountDescription: string,  discountAmount: number): Observable<Discount>{
    const Discount: Discount = 
    {

      DiscountId: discountId,
      DiscountName: discountName,
      DiscountDescription: discountDescription,
      DiscountAmount: discountAmount
    };
  
    const url = `${this.discountUri}/${discountId}`
    return this.http.put<Discount>(url, Discount)
  }
  
  postDiscount(discountName: string,discountDescription: string,  discountAmount: number):Observable<Discount>
  {
    const Discount: Discount = 
    {
      DiscountId: 0,
      DiscountName: discountName,
      DiscountDescription: discountDescription,
      DiscountAmount: discountAmount
     
    };
    return this.http.post<Discount>(this.discountUri, Discount)
  }
}
