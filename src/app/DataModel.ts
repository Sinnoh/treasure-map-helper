export interface DataModel {
  counters: {[key in COUNTER_NAMES]?: number}
}

export type COUNTER_NAMES = 'MAP_COUNTER' | 'GIL_COUNTER';


export interface SetupDataModel {
  GIL_COUNTER?:number;
}
