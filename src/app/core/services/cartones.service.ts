import { Injectable } from '@angular/core';
import { Cartones } from '../../components/partida/cartones/cartones';

@Injectable({
  providedIn: 'root',
})
export class CartonesService {
  conf = {
    cantCartones: 10,
    isGameActive: false,
    numPlayerCartones: [0],
  };

  remainingBalls: number[] = [];
  cartones: Cartones[] = [];

  playerCartones: Cartones[] = [];

  bingoColumns: number[][] = [];

  currentBall: number | undefined = 0;

  gameWin = {
    isGameWin: false,
    numCartonesWin: [0],
  };

  ad: string = '';

  constructor() {
    this.gameWin.numCartonesWin = [];
  }

  saveConf(newConf: any) {
    this.conf = newConf;
  }

  generateColumns() {
    const BColumn = this.remainingBalls.slice(0, 15);
    const IColumn = this.remainingBalls.slice(15, 30);
    const NColumn = this.remainingBalls.slice(30, 45);
    const GColumn = this.remainingBalls.slice(45, 60);
    const OColumn = this.remainingBalls.slice(60, 75);

    this.bingoColumns = [BColumn, IColumn, NColumn, GColumn, OColumn];
  }

  generateRemainingBalls() {
    this.remainingBalls = Array(75)
      .fill(0)
      .map((_, i) => i + 1);
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getColumn(num: number) {
    let col;

    switch (true) {
      case num <= 15:
        col = 'B';
        break;

      case num >= 16 && num <= 30:
        col = 'I';
        break;
      case num >= 31 && num <= 45:
        col = 'N';
        break;
      case num >= 46 && num <= 60:
        col = 'G';
        break;
      case num >= 61 && num <= 75:
        col = 'O';
        break;
    }

    return col;
  }

  checkCartones() {
    const cartones: Cartones[] = this.cartones;
    const remainingBalls: number[] = this.remainingBalls;

    cartones.forEach((carton) => {
      // Comprobar filas
      for (const row of carton.cartonNums) {
        if (row.every((number) => !remainingBalls.includes(number))) {
          carton.isWinner = true;
          carton.winnerNumbers.push(
            ...row.filter((num) => !carton.winnerNumbers.includes(num))
          );

          this.gameWin.isGameWin = true;
          if (!this.gameWin.numCartonesWin.includes(carton.idCarton)) {
            this.gameWin.numCartonesWin.push(carton.idCarton);
          }
        }
      }

      // Comprobar columnas (transponer la matriz)
      const transposedCarton = carton.cartonNums[0].map((_, colIndex) =>
        carton.cartonNums.map((row) => row[colIndex])
      );
      for (const column of transposedCarton) {
        if (column.every((number) => !remainingBalls.includes(number))) {
          carton.isWinner = true;
          carton.winnerNumbers.push(
            ...column.filter((num) => !carton.winnerNumbers.includes(num))
          );

          this.gameWin.isGameWin = true;
          if (!this.gameWin.numCartonesWin.includes(carton.idCarton)) {
            this.gameWin.numCartonesWin.push(carton.idCarton);
          }
        }
      }

      // Comprobar diagonales (principales y secundarias)
      const diagonals = [
        carton.cartonNums.map((row, index) => row[index]),
        carton.cartonNums.map(
          (row, index) => row[carton.cartonNums.length - index - 1]
        ),
      ];
      for (const diagonal of diagonals) {
        if (diagonal.every((number) => !remainingBalls.includes(number))) {
          carton.isWinner = true;
          carton.winnerNumbers.push(
            ...diagonal.filter((num) => !carton.winnerNumbers.includes(num))
          );

          this.gameWin.isGameWin = true;
          if (!this.gameWin.numCartonesWin.includes(carton.idCarton)) {
            this.gameWin.numCartonesWin.push(carton.idCarton);
          }
        }
      }
    });
    if (this.gameWin.numCartonesWin.length > 0) {
      const audio = new Audio('./audios/Bingo.mp3');
      audio.play();
      if (this.gameWin.numCartonesWin.length == 1) {
        this.ad = `Bingo en el cartón #${this.gameWin.numCartonesWin[0]}`;
      } else {
        this.ad = `Bingo en los cartonés #${this.gameWin.numCartonesWin.join(
          ', #'
        )}`;
      }
      return true;
    } else {
      return false;
    }
  }

  startGame() {
    this.generateRemainingBalls();

    this.generateColumns();
    this.conf.isGameActive = true;
  }

  gameOver() {
    this.conf = {
      cantCartones: 10,
      isGameActive: false,
      numPlayerCartones: [],
    };
    this.remainingBalls = [];
    this.cartones = [];
    this.playerCartones = [];
    this.bingoColumns = [];

    this.currentBall = 0;
    this.gameWin = {
      isGameWin: false,
      numCartonesWin: [],
    };
  }
}
