import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';
import { DeliveryDto } from './dto/delivery.dto';
import { HttpModule } from '@nestjs/axios';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryService],
      imports: [HttpModule],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
  });

  it('should calculate the best route', async () => {
    const droneSpeed = 12;
    const deliveryDto = new DeliveryDto('A1', 'G4', 'F8');

    const graph = {
      A1: { G4: 3 },
      G4: { F8: 2 },
      F8: {},
    };

    const result = await service.calculateBestRoute(
      graph,
      deliveryDto.droneStart,
      deliveryDto.pickup,
      deliveryDto.destination,
    );

    expect(result.totalTime).toBeLessThanOrEqual(droneSpeed);
    expect(result.path).toContain(deliveryDto.droneStart);
    expect(result.path).toContain(deliveryDto.pickup);
    expect(result.path).toContain(deliveryDto.destination);
  });
});
