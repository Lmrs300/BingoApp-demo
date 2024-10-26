import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CartonesService } from '../../../core/services/cartones.service';

@Component({
  selector: 'app-random-ball',
  templateUrl: './random-ball.component.html',
  styleUrl: './random-ball.component.css',
})
export class RandomBallComponent {
  cartonesService = inject(CartonesService);

  isSlide: boolean = false;

  sliderValCount = 115;

  @ViewChild('slideBtn') slideBtn!: ElementRef;

  getBall() {
    //deshabilitar boton
    this.slideBtn.nativeElement.disabled = true;

    if (this.cartonesService.remainingBalls.length == 0) {
      //retornar si no hay mas números
      this.cartonesService.ad = 'Se acabaron las bolas';
      alert('se acabo el juego.');
      return;
    }

    this.cartonesService.ad = 'Espera...';
    //obtener indice aleatorio de la bola a sacar del array

    const randomIndex = this.cartonesService.getRandomNumber(
      0,
      this.cartonesService.remainingBalls.length - 1
    );

    //obtener bola actual

    const currentBall = this.cartonesService.remainingBalls[randomIndex];

    //mover el slider
    this.sliderValCount = 115 - 100 * currentBall;

    //guardar bola actual

    this.cartonesService.currentBall = currentBall;

    setTimeout(() => {
      //sacar la bola actual del array de bolas restantes
      this.cartonesService.remainingBalls =
        this.cartonesService.remainingBalls.filter(
          (ball) => ball !== this.cartonesService.currentBall
        );

      const isWin = this.cartonesService.checkCartones();

      if (!isWin) {
        this.cartonesService.ad = 'Gira la bola';
        //habilitar boton
        this.slideBtn.nativeElement.disabled = false;
      }
    }, 3000);
  }
}
