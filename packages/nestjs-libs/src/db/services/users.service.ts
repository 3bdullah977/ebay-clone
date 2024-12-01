import { CreateUserDto } from "@/dtos";
import { Injectable } from "@nestjs/common";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { hash } from "argon2";

@Injectable()
export class UsersService {
  async create(dto: CreateUserDto) {
    const { password } = dto;
    const passwordHash = await hash(password);
    await db.insert(users).values({
      ...dto,
      passwordHash,
      hashedRefreshToken: "null",
      profileImageUrl: "null",
    });
  }

  async findByEmail(email: string) {
    return await db.query.users.findFirst({ where: eq(users.email, email) });
  }

  async findOne(id: number) {
    return await db.query.users.findFirst({ where: eq(users.userId, id) });
  }

  async updateHashedRefreshToken(userId: number, hashedRT: string) {
    await db
      .update(users)
      .set({
        hashedRefreshToken: hashedRT,
      })
      .where(eq(users.userId, userId));
  }
}
