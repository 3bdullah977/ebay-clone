import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString({ groups: ["buyer", "seller"] })
  role: "buyer" | "seller";
}
