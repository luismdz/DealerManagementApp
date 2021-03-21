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
import { Router, ActivatedRoute } from '@angular/router';

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
  editMode = false;
  currentId: number;

  constructor(
    private fb: FormBuilder,
    private carSvc: CarService,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (id) {
        this.carSvc.getById(id).subscribe(
          (car) => {
            if (car) {
              this.editMode = true;
              this.currentId = id;

              const data = {
                brand: this.brands
                  .filter((brand) => brand.name === car.brand)
                  .map((b) => b.id)[0],
                model: car.carModelId,
                color: car.color,
                year: car.year,
              };

              this.form.patchValue(data);
            }
          },
          (error) => console.log(error)
        );
      }
    });
  }

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

    const carData: CarDto = {
      carModelId: model,
      color,
      year,
    };

    if (this.editMode) {
      this.carSvc.updateCar(this.currentId, carData).subscribe(
        (resp) => {
          this.router.navigateByUrl(`/dealers/user`);
        },
        (error) => console.log(error)
      );
    } else {
      this.carSvc.createCar(carData).subscribe(
        (resp) => {
          this.router.navigateByUrl(`/dealers/user`);
        },
        (error) => console.log(error)
      );
    }
  }
}
