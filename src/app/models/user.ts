export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
}

export interface SignUpParams {
  name: string;
  email: string;
  password?: string;
  checkout?: boolean;
  dialogId?: string;
}

export type SignInParams = Omit<SignUpParams, 'name'>;