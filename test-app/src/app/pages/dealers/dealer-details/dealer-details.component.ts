import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealerService } from '../../../services/dealer.service';
import { DealerDto } from '../../../models/dealer.model';
import { switchMap } from 'rxjs/operators';
import { CarDto } from '../../../models/car.model';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-dealer-details',
  templateUrl: './dealer-details.component.html',
  styleUrls: ['./dealer-details.component.scss'],
})
export class DealerDetailsComponent implements OnInit {
  dealer: DealerDto;
  routePath = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dealerSvc: DealerService,
    private carSvc: CarService
  ) {
    this.loadData();
  }

  ngOnInit(): void {}

  loadData() {
    this.routePath = this.route.snapshot.routeConfig.path;

    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (id) {
        this.dealerSvc
          .getById(id)
          .pipe(switchMap((dealer) => this.dealerSvc.getDealerStock(dealer.id)))
          .subscribe(
            (dealer) => {
              this.dealer = dealer;
            },
            (error) => {
              console.log(error);
              this.router.navigateByUrl('/dealers/user');
            }
          );
      } else if (this.routePath === 'user') {
        this.dealerSvc
          .getByUser()
          .pipe(switchMap((dealer) => this.dealerSvc.getDealerStock(dealer.id)))
          .subscribe(
            (dealer) => {
              this.dealer = dealer;
            },
            (error) => {
              console.log(error);
              this.router.navigateByUrl('/dealers/user');
            }
          );
      } else {
        this.router.navigateByUrl('/dealers/user');
      }
    });
  }

  onDeleteCar(car: CarDto) {
    this.carSvc.deleteCar(car.id).subscribe(
      () => this.loadData(),
      (error) => console.log(error)
    );
  }
}
