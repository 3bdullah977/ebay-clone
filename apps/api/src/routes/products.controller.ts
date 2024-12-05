import { Roles } from '@/services/auth/decorators/roles.decorator';
import { RolesGuard } from '@/services/auth/guards/roles/roles.guard';
import {
  CreateProductDto,
  ProductsService,
  SearchProductsDto,
} from '@ebay-clone/nestjs-libs';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
// TODO: uncomment
// @UseGuards(RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('seller')
  @Post()
  createProduct(@Req() req, @Body() dto: CreateProductDto) {
    return this.productsService.create(dto, req.user.userId);
  }

  @Roles('buyer', 'seller')
  @Get('/:productId')
  findById(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findById(productId);
  }

  @Roles('buyer')
  @Get()
  getAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.productsService.getAll(page, limit, true);
  }

  @Roles('buyer', 'seller')
  @Get('/:sellerId/get-by-seller-id')
  getBySellerId(@Param('sellerId', ParseIntPipe) sellerId: number) {
    console.log(sellerId);
    return this.productsService.findBySellerId(sellerId);
  }

  @Roles('buyer')
  @Post('search-products')
  searchProducts(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Body() dto: SearchProductsDto,
  ) {
    return this.productsService.searchProducts(page, limit, dto.query);
  }
}
