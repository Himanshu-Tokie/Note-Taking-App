export interface HomeNavigationProps{
    theme:themeType
}

export type LabelData = {
    forEach(arg0: (label: any) => void): unknown;
    id:string;
    count: number;
    time_stamp: FirebaseFirestoreTypes.Timestamp;
  };