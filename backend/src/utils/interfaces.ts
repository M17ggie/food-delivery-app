import { Request } from "express";

export interface IToken {
    id: string | null,
    role: string | null
}