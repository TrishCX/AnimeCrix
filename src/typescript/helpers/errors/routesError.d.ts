import { Response } from "express";
export default function throwError(response: Response, status: number, typeofError: string, message?: string): Response<any, Record<string, any>>;
