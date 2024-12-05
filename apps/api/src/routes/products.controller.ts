import { Roles } from '@/services/auth/decorators/roles.decorator';
import { RolesGuard } from '@/services/auth/guards/roles/roles.guard';
import { CreateProductDto, ProductsService } from '@ebay-clone/nestjs-libs';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('seller')
  @UseGuards(RolesGuard)
  @Post('create')
  async createProduct(@Req() req, @Body() dto: CreateProductDto) {
    return this.productsService.create(dto, req.user.userId);
  }
}
