import { Component, inject } from '@angular/core';
import { CartonesService } from '../../../core/services/cartones.service';

@Component({
  selector: 'app-carton-princ',
  templateUrl: './carton-princ.component.html',
  styleUrl: './carton-princ.component.css',
})
export class CartonPrincComponent {
  cartonesService = inject(CartonesService);

  numbers = [...this.cartonesService.remainingBalls];

  cartonPrincNumbers: number[][] = [];

  constructor() {
    for (let i = 0; i < this.numbers.length / 5; i++) {
      this.cartonPrincNumbers.push([
        this.cartonesService.bingoColumns[0][i],
        this.cartonesService.bingoColumns[1][i],
        this.cartonesService.bingoColumns[2][i],
        this.cartonesService.bingoColumns[3][i],
        this.cartonesService.bingoColumns[4][i],
      ]);
    }
  }
}
