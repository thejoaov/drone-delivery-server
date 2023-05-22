// delivery.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { DeliveryDto } from './dto/delivery.dto';
import { apiResponse } from '../utils/mocks/apiResponse';

const mockData = apiResponse;

describe('DeliveryController', () => {
  let controller: DeliveryController;
  let service: DeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [
        {
          provide: DeliveryService,
          useValue: {
            getTravelTimes: jest.fn().mockResolvedValue(mockData),
            calculateBestRoute: jest.fn().mockReturnValue({
              path: ['A1', 'G4', 'F8'],
              totalTime: 8,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<DeliveryController>(DeliveryController);
    service = module.get<DeliveryService>(DeliveryService);
  });

  it('should call the service methods with correct parameters and return the result', async () => {
    const deliveryDto = new DeliveryDto('A1', 'G4', 'F8');

    const resultRoute = await controller.getBestRoute(deliveryDto);
    const resultCoordinates = await controller.getTravelTimes();

    expect(resultRoute).toEqual({
      path: ['A1', 'G4', 'F8'],
      time: 8,
    });
    expect(resultCoordinates).toEqual(Object.keys(mockData));

    // You can add more expectations here to verify if the service methods were called correctly
    expect(service.getTravelTimes).toBeCalledTimes(2);
    expect(service.calculateBestRoute).toBeCalledWith(
      mockData,
      'A1',
      'G4',
      'F8',
    );
  });
});
