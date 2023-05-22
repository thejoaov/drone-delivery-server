import { IsNotEmpty, IsString } from 'class-validator';

export class DeliveryDto {
  @IsNotEmpty()
  @IsString()
  readonly droneStart: string;

  @IsNotEmpty()
  @IsString()
  readonly pickup: string;

  @IsNotEmpty()
  @IsString()
  readonly destination: string;

  constructor(droneStart: string, pickup: string, destination: string) {
    this.droneStart = droneStart;
    this.pickup = pickup;
    this.destination = destination;
  }
}
