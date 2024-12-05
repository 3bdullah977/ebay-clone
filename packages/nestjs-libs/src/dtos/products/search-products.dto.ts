import { IsEmail, IsString, MinLength } from "class-validator";

export class SearchProductsDto {
  @IsString()
  query?: string;
}
