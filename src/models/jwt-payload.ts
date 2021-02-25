export type JwtPayload = {
  firstName: string;
  lastName: string;
  role: string;
  id: number;
  iat?: number;
  exp?: number;
};
