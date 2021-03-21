import { Component, OnInit } from '@angular/core';
import { DealerService } from '../../services/dealer.service';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.component.html',
  styleUrls: ['./dealers.component.scss'],
})
export class DealersComponent {
  dealers$: any;

  constructor(private dealerSvc: DealerService) {
    this.loadDealers();
  }

  loadDealers() {
    this.dealers$ = this.dealerSvc.getDealers();
  }

  onDelete(id: number) {
    this.dealerSvc.deleteDealer(id).subscribe(
      (resp) => this.loadDealers(),
      (error) => console.log(error)
    );
  }
}
