import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { CarBrandDto, CarModelDto, CarDto } from '../../../models/car.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss'],
})
export class CarEditComponent implements OnInit {
  form: FormGroup;
  brands: CarBrandDto[] = [];
  models: CarModelDto[] = [];
  years: number[] = [];

  constructor(
    private fb: FormBuilder,
    private carSvc: CarService,
    private router: Router
  ) {
    this.initForm();

    // Get brands
    this.carSvc.getBrands().subscribe(
      (brands) => (this.brands = brands),
      (error) => console.log(error)
    );

    // Get model by brand selected
    this.brand.valueChanges
      .pipe(switchMap((brandId) => this.carSvc.getModelsByBrandId(brandId)))
      .subscribe(
        (models) => (this.models = models),
        (error) => console.log(error)
      );

    // Fill years
    const maxYear = new Date().getFullYear();
    for (let i = maxYear + 1; i >= 1980; i--) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {}

  // Getters
  get brand() {
    return this.form.get('brand');
  }

  get model() {
    return this.form.get('model');
  }

  get year() {
    return this.form.get('year');
  }

  get color() {
    return this.form.get('color');
  }

  // Initialize form
  initForm() {
    this.form = this.fb.group({
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
    });
  }

  createCar() {
    const { model, color, year } = this.form.value;

    const newCar: CarDto = {
      carModelId: model,
      color,
      year,
    };

    this.carSvc.createCar(newCar).subscribe(
      (resp) => {
        this.router.navigateByUrl(`/dealers/${resp}`);
      },
      (error) => console.log(error)
    );
  }
}
