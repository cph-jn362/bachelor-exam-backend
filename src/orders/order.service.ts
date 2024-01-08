import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from "./models/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService{
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>
    ){}

    async create(order: CreateOrderDto): Promise<OrderEntity>{
        return this.orderRepository.save(order);
    }

    async findAll(): Promise<OrderEntity[]>{
        return this.orderRepository.find();
    }

    async findOne(id: number): Promise<OrderEntity>{
        return this.orderRepository.findOneBy({id : id});
    }

}