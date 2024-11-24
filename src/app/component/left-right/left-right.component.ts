import { Component } from '@angular/core';
import {Button} from "primeng/button";

@Component({
  selector: 'app-left-right',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './left-right.component.html',
  styleUrl: './left-right.component.scss'
})
export class LeftRightComponent {

  private static readonly options = ['Left', 'Right'];

  protected currentValue?:string;

  protected randomize(){
    this.currentValue = LeftRightComponent.options[Math.floor(Math.random()*LeftRightComponent.options.length)];
  }

}
