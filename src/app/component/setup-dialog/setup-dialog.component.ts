import { Component } from '@angular/core';
import {InputNumberModule} from "primeng/inputnumber";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Button} from "primeng/button";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-setup-dialog',
  standalone: true,
  imports: [
    InputNumberModule,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './setup-dialog.component.html',
  styleUrl: './setup-dialog.component.scss'
})
export class SetupDialogComponent {

  protected  readonly INIT_GIL = 'INIT_GIL' as const;

  protected formGroup: FormGroup = new FormGroup({});


  constructor(private dialogRef: DynamicDialogRef) {

  }





}
