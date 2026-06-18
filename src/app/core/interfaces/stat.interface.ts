export interface Stat {
  value: string;
  unit: string;
  label: string;
  description?: string;
  icon?: any;
  progress?: number;
  highlighted?: boolean;
  colorClass?: string;
}
