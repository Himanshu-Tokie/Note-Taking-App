export interface iconType{
    icon: (width: number, height: number, color: string, borderColor?: string) => JSX.Element;
    width: number;
    height: number;
    color: string;
    action?: () => void;
    borderColor?: string;
  }