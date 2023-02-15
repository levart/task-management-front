import {IUser} from "../../../core/interfaces/user";


export interface IToken {
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}

export interface ILoginPayload {
  user: IUser;
  token: IToken;
}
