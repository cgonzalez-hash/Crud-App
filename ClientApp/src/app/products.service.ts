import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Product } from "./product";
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    
  };
  private productUri: string = "api/products"
  constructor(private http: HttpClient) { }
  getProduct(userId:number):Observable<Product>{
    const url = `${this.productUri}/${userId}`
    return this.http.get<Product>(url)
  }
  getProducts():Observable<Product[]>{
    const url = `${this.productUri}/index`
    return this.http.get<Product[]>(url)
  }
  deleteProduct(userId: number):Observable<Product>{
    console.log("Service Deleting")
    const url = `${this.productUri}/${userId}`
    console.log(url)
    return this.http.delete<Product>(url)
    
  }
  updateProduct(id: number, name: string, price: number,description:string): Observable<Product>{
    const Product: Product = 
    {
    ProductId: id,
    Name: name,
    Price: price,
    Description: description
    };
  
    const url = `${this.productUri}/${id}`
    return this.http.put<Product>(url, Product)
  }
  
  postProduct(name: string, price: number,description:string):Observable<Product>
  {
    const Product: Product = 
    {
      ProductId: 0,
      Name: name,
      Price: price,
      Description: description
    };
    return this.http.post<Product>(this.productUri, Product)
  }
}
