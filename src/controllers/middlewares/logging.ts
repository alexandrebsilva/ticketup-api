import { Request, Response } from "express";

export function loggingMiddleware(
  request: Request,
  response: Response,
  next?: (err?: any) => any
): any {
  console.log(request.hostname);
  next();
}
