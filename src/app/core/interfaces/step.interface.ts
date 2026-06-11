export interface Step {
  number: string;
  title: string;
  description: string;
  bubble: string;
  colorClass: string;
  icon: 'data' | 'search' | 'warning' | 'shield' | string;
  delayClass?: string;
}
