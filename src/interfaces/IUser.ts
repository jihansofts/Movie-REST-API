export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  refeshToken?: string;
  createdAt?: Date;
}
export interface IUserid {
  id: string;
}

export interface IMessageResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}
