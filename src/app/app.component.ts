import {Component} from '@angular/core';
import {CardModule} from "primeng/card";
import {CounterComponent} from "./component/counter/counter.component";
import {LeftRightComponent} from "./component/left-right/left-right.component";
import {StyleClassModule} from "primeng/styleclass";
import {Button} from "primeng/button";
import {StorageService} from "./service/storage/storage.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-root',
  imports: [CardModule, CounterComponent, LeftRightComponent, StyleClassModule, Button, ConfirmDialogModule],
  providers: [ConfirmationService, MessageService, DialogService],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TreasureMapHelper';


  private _moneySteps: number[] = [3000, 3430, 5000, 7500, 10000, 10290, 15000, 100000];


  constructor(
    private storage: StorageService,
    private confirm: ConfirmationService,
    private dialogService: DialogService) {
    this._moneySteps = this.moneySteps.sort((a, b) => a - b)
  }


  get moneySteps(): number[] {
    return this._moneySteps
  }


  protected resetData() {
    this.confirm.confirm({
      header: 'Reset data',
      message: 'Are you sure you wanna reset all data?',
      accept: () => {
        this.storage.resetData();
        window.location.reload();
      }
    });
  }


}
