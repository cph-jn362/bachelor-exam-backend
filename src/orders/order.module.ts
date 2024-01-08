import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderEntity } from "./models/order.entity";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity])],
    providers: [OrderService],

})
export class OrderModule{}