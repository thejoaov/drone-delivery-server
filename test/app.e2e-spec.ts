import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { apiResponse } from '../src/utils/mocks/apiResponse';

describe('DeliveryController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/delivery/best-route (GET)', () => {
    return request(app.getHttpServer())
      .get('/delivery/best-route?droneStart=A1&pickup=G4&destination=F8')
      .expect(200)
      .expect({
        path: [
          'A1',
          'B1',
          'C1',
          'C2',
          'C3',
          'D3',
          'E3',
          'F3',
          'F4',
          'G4',
          'F4',
          'F5',
          'F6',
          'F7',
          'F8',
        ],
        time: 223.20999999999998,
      });
  });

  it('/delivery/coordinates (GET)', () => {
    return request(app.getHttpServer())
      .get('/delivery/coordinates')
      .expect(200)
      .expect(Object.keys(apiResponse));
  });

  afterAll(async () => {
    await app.close();
  });
});
