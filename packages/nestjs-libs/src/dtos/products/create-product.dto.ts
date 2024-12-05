// @ts-nocheck
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsString,
  IsUrl,
  Min,
  MinLength,
} from "class-validator";

export class CreateProductDto {
  @MinLength(3)
  @IsString()
  title: string;

  @MinLength(3)
  @IsString()
  description: string;

  @MinLength(3)
  @IsString()
  @IsUrl()
  imageUrl: string;

  @IsDecimal()
  @Min(0)
  price: string;

  @IsDecimal()
  @Min(0)
  lowerPound: string;

  @IsBoolean()
  isBiddable: boolean;

  @IsDate()
  bidTimer: Date;
}
