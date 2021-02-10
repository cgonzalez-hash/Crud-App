import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { OrderformComponent } from '../orderform/orderform.component';

@Component({
  selector: 'app-cart-confirm',
  templateUrl: './cart-confirm.component.html',
  styleUrls: ['./cart-confirm.component.css']
})
export class CartConfirmComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OrderformComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }
  confirm() {
    this.dialogRef.close(true);
  }
  close() {
    this.dialogRef.close();
  }
}
