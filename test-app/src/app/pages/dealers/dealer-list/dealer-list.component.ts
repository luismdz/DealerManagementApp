import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DealerDto } from '../../../models/dealer.model';

@Component({
  selector: 'app-dealer-list',
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.scss'],
})
export class DealerListComponent implements OnInit {
  @Input() dealers: DealerDto[] = [];
  @Output() delete = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  eliminar(dealerId: number) {
    if (dealerId > 0) {
      this.delete.emit(dealerId);
    }
  }
}
