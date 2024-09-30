import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/database/entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "../dto/createProduct.dto";
import { UpdateProductdto } from "../dto/updateProduct.dto";
import { PaginationDto } from "src/shared/dto/pagination.dto";

@Injectable()
export class productService{
    constructor(
      @InjectRepository(Product)
      private productRepository:Repository<Product> 
    ){}

    async find(pagination: PaginationDto) {
      const { offset, limit, page } = pagination;
      console.log('offset', offset);
      console.log('limit', limit);
      console.log('page', page);
  
      const [items, totalItem] = await this.productRepository
        .createQueryBuilder('product')
        .take(limit)
        .skip(offset)
        .getManyAndCount();
  
      return { items, totalItem };
    }
    
    async createProduct(createProduct: CreateProductDto) {
      const product = this.productRepository.create(createProduct);
      return await this.productRepository.save(product);
    }

    async update(id: number, body: UpdateProductdto) {
      return await this.productRepository.save({
        id,
        ...body,
      });
    }
    delete(id:number){
      return this.productRepository.delete({id})
    }
}