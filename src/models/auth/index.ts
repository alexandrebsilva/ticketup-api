export type JwtSignature = {
  firstName: string;
  lastName: string;
  role: string;
  id: number;
  refreshToken?: string;
  refreshTokenVersion?: number;
  iat?: number;
  exp?: number;
};

export type LoginPayloadReq = {
  email: string;
  password: string;
};
