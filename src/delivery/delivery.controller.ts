// delivery.controller.ts
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryDto } from './dto/delivery.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('coordinates')
  async getTravelTimes() {
    const travelTimes = await this.deliveryService.getTravelTimes();

    return Object.keys(travelTimes);
  }

  @Get('best-route')
  async getBestRoute(@Query(ValidationPipe) deliveryDto: DeliveryDto) {
    const graphData = await this.deliveryService.getTravelTimes();

    const result = this.deliveryService.calculateBestRoute(
      graphData,
      deliveryDto.droneStart,
      deliveryDto.pickup,
      deliveryDto.destination,
    );

    return {
      path: result.path,
      time: result.totalTime,
    };
  }
}
