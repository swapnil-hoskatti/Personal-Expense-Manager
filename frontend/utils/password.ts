
// Logic to deal with password hashing and validation
import bcrypt from "bcrypt";

export async function saltAndHashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}