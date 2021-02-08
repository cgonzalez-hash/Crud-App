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
  
    return this.http.get<Product[]>(this.productUri)
  }
  deleteProduct(productid: number):Observable<Product>{
    console.log("Service Deleting")
    const url = `${this.productUri}/${productid}`
    console.log(url)
    return this.http.delete<Product>(url)
    
  }
  updateProduct(id: number, name: string, price: number, description:string, quantity:number, image: File): Observable<Product>{
    const Product: Product = 
    {
    productsId: id,
    name: name,
    price: price,
    description: description,
    quantityAvailable: quantity,
    Image: image
    };
  
    const url = `${this.productUri}/${id}`
    return this.http.put<Product>(url, Product)
  }
  
  postProduct(name: string, price: number,description:string, quantity:number, image: File):Observable<Product>
  {
    const url = `${this.productUri}`
   

    var formData = new FormData();
    formData.append("name", name)
    formData.append("price", price.toString())
    formData.append("description", description)
    formData.append("quantityAvailable", quantity.toString())
    formData.append("image", image, image.name)
 
    return this.http.post<Product>(url, formData)
  }
}
