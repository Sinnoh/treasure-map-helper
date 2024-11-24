import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AsyncPipe, DecimalPipe} from "@angular/common";
import {Button} from "primeng/button";
import {COUNTER_NAMES} from "../../DataModel";
import {StorageService} from "../../service/storage/storage.service";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [
    AsyncPipe,
    Button,
    DecimalPipe,
    InputNumberModule,
    FormsModule
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent implements OnInit {

  private _counter$: BehaviorSubject<number>;

  @Input({required: true}) counterName: COUNTER_NAMES;

  @Input() steps: Array<number> | undefined = undefined;

  @Input() showCustom: boolean = false;
  @Input() showUndo: boolean = true;

  protected customValue: string = '';

  protected pastValues:number[] = [];

  constructor(private storage: StorageService) {

  }

  ngOnInit(): void {

    this._counter$ = new BehaviorSubject<number>(this.storage.getCounterValue(this.counterName) ?? 0)

    this.storage.registerCounter(this.counterName, this._counter$);
  }


  get counter$() {
    return this._counter$.asObservable()
  }


  public incrementCounter(increment: number = 1) {
    this.pastValues.push(this._counter$.value);
    this._counter$.next(this._counter$.value + increment);
  }

  protected undo(){
    let lastCounterValue = this.pastValues.pop();

    if(lastCounterValue){
      this._counter$.next(lastCounterValue);
    }
  }

  protected addCustom() {
    this.incrementCounter(Number(this.customValue));
  }

}
