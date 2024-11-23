export type ResponseDT<T> = {
  code: number;
  status: boolean;
  message: string;
  data: T;
};
