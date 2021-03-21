import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CarBrandDto, CarDto } from '../models/car.model';
import { DealerService } from './dealer.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private readonly apiUrl = environment.apiUrl + 'cars';

  constructor(private http: HttpClient, private dealerSvc: DealerService) {}

  getCars() {
    return this.http.get<CarDto[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<CarDto>(`${this.apiUrl}/${id}`);
  }

  getBrands() {
    return this.http.get<CarBrandDto[]>(`${this.apiUrl}/brands`);
  }

  getModelsByBrandId(brandId: number) {
    return this.http.get<CarBrandDto[]>(
      `${this.apiUrl}/models?brandId=${brandId}`
    );
  }

  createCar(newCar: CarDto) {
    return this.dealerSvc.getByUser().pipe(
      switchMap((dealer) => {
        newCar.dealerId = dealer.id;
        return this.http.post<CarDto>(this.apiUrl, newCar);
      }),
      map(() => newCar.dealerId)
    );
  }

  updateCar(id: number, car: CarDto) {
    return this.http.put<CarDto>(`${this.apiUrl}/${id}`, car);
  }

  deleteCar(id: number) {
    return this.http.delete<CarDto>(`${this.apiUrl}/${id}`);
  }
}
