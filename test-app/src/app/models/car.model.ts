export interface CarDto {
  id?: number;
  brand?: string;
  model?: string;
  color?: string;
  year?: number;
  dealerId?: number;
  dealer?: string;
  carModelId?: number;
  createdAt?: Date;
  createdById?: number;
}

export interface CarBrandDto {
  id?: number;
  name: string;
}

export interface CarModelDto {
  modelId?: number;
  name: string;
}
