import { Module } from '@nestjs/common';
import { DeliveryModule } from './delivery/delivery.module';
import { DeliveryController } from './delivery/delivery.controller';
import { DeliveryService } from './delivery/delivery.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DeliveryModule, HttpModule],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class AppModule {}
