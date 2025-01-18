import {DestroyRef, Injectable} from '@angular/core';
import {COUNTER_NAMES, DataModel} from "../../DataModel";
import {Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public static readonly COUNTER_KEY = 'COUNTERS' as const;

  private _data:DataModel;

  constructor(
    private destroyRef: DestroyRef
  ) {
    this._data = this.loadData();
  }

  protected getDefaultData():DataModel{
    return {
      counters: {
        GIL_COUNTER: 0,
        MAP_COUNTER: 0
      }
    }
  }

  private loadData():DataModel{
    const dataFromStore =  window.localStorage.getItem(StorageService.COUNTER_KEY);

    if(!dataFromStore){
      const defaultData = this.getDefaultData();
      this.saveData(defaultData);
      return defaultData;
    }

    return JSON.parse(dataFromStore) as unknown as DataModel;
  }

  private saveData(data: DataModel){
    window.localStorage.setItem(StorageService.COUNTER_KEY, JSON.stringify(data));
  }

  public registerCounter(key:COUNTER_NAMES, counter$:Observable<number>){
    counter$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(newValue => {
      const newData: DataModel = {
        ...this._data,
        counters: {
          ...this._data.counters,
          [key]: newValue
        }
      }

      this.saveData(newData);
      this._data = newData;
    })
  }

  public getCounterValue(key: COUNTER_NAMES):number|undefined{
    return this._data.counters[key];
  }

  public resetData(){
    this.saveData(this.getDefaultData());
  }

}
