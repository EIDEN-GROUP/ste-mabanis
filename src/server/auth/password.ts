import { hash, verify } from "@node-rs/bcrypt";

const BCRYPT_COST = 12;

export async function hashPassword(password: string): Promise<string> {
  return hash(password, BCRYPT_COST);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return verify(password, hash);
}