export interface ComponentClass<T> {
  new(...args: any[]): T;
  name?: string;
};

export interface Component {}
