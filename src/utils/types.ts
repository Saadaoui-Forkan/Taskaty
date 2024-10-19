export type JWTPayload = {
    id: number,
    first_name: string,
    last_name: string,
    email: string
}

export interface Alert {
  alertText: string;
  type: string;
}

export interface ErrorResponse {
  message: string;
}