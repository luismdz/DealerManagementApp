import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DealerDto } from 'src/app/models/dealer.model';
import { UserDto } from 'src/app/models/user.model';
import { DealerService } from 'src/app/services/dealer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dealer-create',
  templateUrl: './dealer-create.component.html',
  styleUrls: ['./dealer-create.component.scss'],
})
export class DealerCreateComponent implements OnInit {
  userForm: FormGroup;
  dealerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.dealerForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  crear() {
    const user: UserDto = this.userForm.value;
    const dealer: DealerDto = this.dealerForm.value;

    user.dealer = dealer.name;
    this.userSvc.createUser(user).subscribe(
      (resp) => this.router.navigateByUrl('/dealers'),
      (error) => {
        console.log(error);
        this.router.navigateByUrl('/dealers');
      }
    );
  }
}
