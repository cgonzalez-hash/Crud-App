import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Product } from '../product';
import { LoadingService } from "../loading.service";

@Component({
  selector: 'app-productsform',
  templateUrl: './productsform.component.html',
  styleUrls: ['./productsform.component.css']
})
export class ProductsformComponent implements OnInit {

  productForm: FormGroup;
  newform: FormGroup;
  isEdit:boolean;
  selectedFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductsformComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private loaderService: LoadingService
  ) {
    console.log(data)
    const productForm: any = {
      productsId: data.ProductId,
      name: data.Name,
      description: data.Description,
      price: data.Price,
      quantityAvailable: data.Quantity,
      image: data.image    }
    this.createFormGroup(productForm);
    this.isEdit = data.isEdit;
   }
   createFormGroup(productForm: Product): void {
    this.productForm = this.formBuilder.group(productForm);
    
  }
  close() {
    this.dialogRef.close();
  }
  save(isDelete: boolean) {
    const result: any = Object.assign({}, this.productForm.value);
    const product = { productid: result.productsId, name: result.name, description: result.description, price: result.price, quantity: result.quantityAvailable, image: result.image.files[0], isDelete: isDelete};
    console.log( result.image.files[0])
    this.dialogRef.close(product);
  }

  ngOnInit() {
  }

}
