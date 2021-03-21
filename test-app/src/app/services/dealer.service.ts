import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DealerDto } from '../models/dealer.model';
import { map } from 'rxjs/operators';
import { CarService } from './car.service';

@Injectable({
  providedIn: 'root',
})
export class DealerService {
  private readonly apiUrl = environment.apiUrl + 'dealers';

  constructor(private http: HttpClient) {}

  getDealers() {
    return this.http.get<DealerDto[]>(this.apiUrl);
  }

  getDealerStock(id: number) {
    return this.http.get<DealerDto>(`${this.apiUrl}/stock/${id}`);
  }

  getById(id: number) {
    return this.http.get<DealerDto>(`${this.apiUrl}/${id}`);
  }

  getByUser() {
    return this.http.get<DealerDto>(`${this.apiUrl}/user`);
  }

  // createDealer(dealer: any) {
  //   return this.http.post<DealerDto>(this.apiUrl, dealer);
  // }

  updateDealer(id: number, dealer: any) {
    return this.http.post<DealerDto>(`${this.apiUrl}/${id}`, dealer);
  }

  deleteDealer(id: number) {
    return this.http.delete<DealerDto>(`${this.apiUrl}/${id}`);
  }
}
