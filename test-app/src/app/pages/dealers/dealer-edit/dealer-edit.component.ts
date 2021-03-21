import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../models/user.model';
import { DealerDto } from '../../../models/dealer.model';
import { UserService } from '../../../services/user.service';
import { DealerService } from '../../../services/dealer.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-dealer-edit',
  templateUrl: './dealer-edit.component.html',
  styleUrls: ['./dealer-edit.component.scss'],
})
export class DealerEditComponent implements OnInit {
  dealerForm: FormGroup;
  dealer: DealerDto;
  user: UserDto;

  constructor(
    private fb: FormBuilder,
    private dealerSvc: DealerService,
    private userSvc: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      const dealerId = params['id'];

      if (dealerId) {
        this.dealerSvc
          .getById(dealerId)
          .pipe(
            switchMap((dealer) => {
              this.dealer = dealer;
              return this.userSvc.getUserById(dealer.userId);
            })
          )
          .subscribe((userResp: UserDto) => {
            const data = {
              user: userResp.email,
              name: this.dealer.name,
            };

            this.dealerForm.patchValue(data);
          });
      }
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.dealerForm = this.fb.group({
      name: ['', Validators.required],
      user: new FormControl({ value: '', disabled: true }),
    });
  }

  editarDealer() {}
}
