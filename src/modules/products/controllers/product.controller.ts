import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Req, Session, UploadedFile, UseInterceptors  } from "@nestjs/common";
import { productService } from "../services/product.service";
import { CreateProductDto } from "../dto/createProduct.dto";
import { UpdateProductdto } from "../dto/updateProduct.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { PageDto } from "src/shared/dto/Page.dto";
import { PaginationMetaDto } from "src/shared/dto/pagination-meta.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";
@Controller("products")
export class productsController{
    constructor(private productService : productService) {}
    @Get()
    async find(@Query() paginationDto: PaginationDto) {
      const { items, totalItem } = await this.productService.find(paginationDto);
  
      return new PageDto(
        items,
        new PaginationMetaDto({ paginationDto, totalItem }),
      );
    }
    
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() body: CreateProductDto , @UploadedFile() file: Express.Multer.File) {
      const subFolder = path.join("products",'1')
      const mainFolder = path.join("public",subFolder)
      if (!fs.existsSync(mainFolder))
        fs.mkdirSync(mainFolder, { recursive: true });
      console.log(file)
      return await this.productService.createProduct (body);
    }
    @Put(':id')
    async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductdto,) 
    {
      return await this.productService.update(id, body);
    }
    @Delete(':id')
    delete(
      @Param('id', ParseIntPipe) id: number
    ){
      return this.productService.delete(id);
    }
}