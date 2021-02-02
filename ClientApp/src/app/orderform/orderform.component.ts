import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Order } from "../order";

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css']
})
export class OrderformComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OrderformComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    console.log(data)
    const orderForm: Order = {
      OrderId: data.OrderId,
      UserId: data.UserId,
      OrderDetails: data.OrderDetails,
      OrderTotal: data.OrderTotal,
      Shipped: data.Shipped}
    this.createFormGroup(orderForm);
    this.isEdit = data.isEdit;
   }
  orderForm: FormGroup;
  newform: FormGroup;
  isEdit:boolean;

  createFormGroup(orderForm: Order): void {
    this.orderForm = this.formBuilder.group(orderForm);
    
  }
  save(isDelete: boolean) {
    const result: Order = Object.assign({}, this.orderForm.value);
    const product = { OrderId: result.OrderId, UserId: result.UserId, OrderDetails: result.OrderDetails, OrderTotal: result.OrderTotal, Shipped: result.Shipped, isDelete: isDelete};
    this.dialogRef.close(product);
  }
  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }
}
