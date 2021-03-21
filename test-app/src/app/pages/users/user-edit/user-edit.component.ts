import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDto } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  user: UserDto;
  form: FormGroup;
  private userSub: Subscription;
  private currentId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSvc: UserService
  ) {
    this.userSub = this.userSvc.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
        this.currentId = user.id;
        this.form.patchValue(this.user);
      },
      (error) => {
        console.log(error);
        this.router.navigateByUrl('/');
      }
    );

    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      age: new FormControl(0, [Validators.required]),
      dealer: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {}

  editUser() {
    this.user = this.form.value;

    this.userSvc.updateUser(this.currentId, this.user).subscribe(
      (resp) => this.router.navigateByUrl('/'),
      (error) => {
        console.log(error);
        this.router.navigateByUrl('/');
      }
    );
  }

  onCancel() {
    if (this.user?.isAdmin) {
      this.router.navigateByUrl('/dealers');
    } else {
      this.router.navigateByUrl('/dealers/user');
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
