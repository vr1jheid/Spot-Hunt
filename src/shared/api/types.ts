export interface ServerResponse<T> {
  status: string;
  code: number;
  data: T;
}
