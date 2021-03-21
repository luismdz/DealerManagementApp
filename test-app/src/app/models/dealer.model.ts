import { CarDto } from './car.model';

export interface DealerDto {
  id?: number;
  name: string;
  userId?: number;
  stock?: CarDto[];
}
