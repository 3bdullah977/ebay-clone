import { CreateProductDto, UpdateProductDto } from "@/dtos";
import { Injectable } from "@nestjs/common";
import { db } from "..";
import { bids, products } from "../schema";
import { and, eq, like, or, sql } from "drizzle-orm";

// TODO: Add update, delete
@Injectable()
export class ProductsService {
  async create(dto: CreateProductDto, sellerId: number) {
    const {
      title,
      description,
      bidTimer,
      imageUrl,
      isBiddable,
      lowerPound,
      price,
    } = dto;
    await db.insert(products).values({
      sellerId,
      title,
      bidTimer,
      imageUrl,
      description,
      lowerPound,
      isBiddable,
      price,
    });
  }

  async getAll(page: number, limit: number, withSeller: boolean) {
    const offset = (page - 1) * limit;
    return await db.query.products.findMany({
      offset,
      limit,
      with: {
        seller: withSeller
          ? {
              columns: {
                passwordHash: false,
                createdAt: false,
                updatedAt: false,
                hashedRefreshToken: false,
              },
            }
          : {
              columns: {
                userId: true,
                passwordHash: false,
                createdAt: false,
                updatedAt: false,
                hashedRefreshToken: false,
              },
            },
      },
    });
  }

  async findBySellerId(sellerId: number) {
    return await db.query.products.findMany({
      where: eq(products.sellerId, sellerId),
    });
  }

  async findById(productId: number) {
    return await db.query.products.findFirst({
      where: eq(products.productId, productId),
      with: {
        bids: { orderBy: sql`${bids.bidAmount} DESC` },
      },
    });
  }

  async searchProducts(page: number, limit: number, query: string) {
    const sanitizedQuery = `%${query}%`;
    const offset = (page - 1) * limit;
    return await db.query.products.findMany({
      where: or(
        like(products.title, sanitizedQuery),
        like(products.description, sanitizedQuery)
      ),
      limit,
      offset,
      with: {
        seller: {
          columns: {
            createdAt: false,
            hashedRefreshToken: false,
            role: false,
            passwordHash: false,
            updatedAt: false,
          },
        },
      },
      columns: {
        updatedAt: false,
        createdAt: false,
      },
      orderBy: sql`${products.createdAt} DESC`,
    });
  }

  async update(productId: number, dto: UpdateProductDto) {}
}
