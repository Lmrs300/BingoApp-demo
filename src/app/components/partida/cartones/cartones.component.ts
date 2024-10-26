import { Component, inject } from '@angular/core';
import { CartonesService } from '../../../core/services/cartones.service';
import { Cartones } from './cartones';

@Component({
  selector: 'app-cartones',
  templateUrl: './cartones.component.html',
  styleUrl: './cartones.component.css',
})
export class CartonesComponent {
  cartones: Cartones[] = [];

  cartonesService = inject(CartonesService);

  filter = false;

  ngOnInit() {
    this.generateCartones();

    this.cartonesService.cartones = this.cartones;
    this.cartonesService.playerCartones = this.cartones.filter(
      (carton) => carton.isPlayerCarton == true
    );
  }

  generateCartones() {
    let isPlayerCarton;

    for (let i = 0; i < this.cartonesService.conf.cantCartones; i++) {
      isPlayerCarton = false;
      if (this.cartonesService.conf.numPlayerCartones.includes(i + 1)) {
        isPlayerCarton = true;
      }
      this.cartones.push({
        idCarton: i + 1,
        cartonNums: this.generateCartonNums(),
        isPlayerCarton: isPlayerCarton,
        isWinner: false,
        winnerNumbers: [],
      });
    }
  }

  generateCartonNums() {
    let nums: number[][] = [];

    for (let i = 0; i < this.cartonesService.bingoColumns.length; i++) {
      let rowNums = [];
      let randomNumber = 0;
      let noRepeat = true;

      do {
        rowNums = [];
        noRepeat = true;
        for (let j = 0; j < 5; j++) {
          randomNumber = this.cartonesService.getRandomNumber(0, 14);
          rowNums.push(this.cartonesService.bingoColumns[j][randomNumber]);
        }

        rowNums.forEach((num) => {
          if (nums.some((row) => row.includes(num))) {
            noRepeat = false;
          }
        });
      } while (!noRepeat);

      nums.push(rowNums);
    }
    nums[2][2] = 0;
    return nums;
  }
}
