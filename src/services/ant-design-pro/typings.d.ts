// @ts-ignore
/* eslint-disable */

declare namespace API {
  type BaseResponse<T> = {
    code: number;
    data: T;
    message: string;
    description: string;
  };

  type CurrentUser = {
    id: number;
    user_name: string;
    user_account: string;
    avatar_url?: string;
    gender: string;
    phone: string;
    email: string;
    user_status: number;
    create_time: Date;
    user_role: number;
    user_code: string;
  };

  type LoginParams = {
    user_account?: string;
    user_password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterParams = {
    user_account?: string;
    user_password?: string;
    check_password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type DeleteUserParams = {
    id: number;
  };
}
