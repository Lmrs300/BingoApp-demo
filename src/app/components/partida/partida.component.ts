import { Component, inject } from '@angular/core';
import { CartonesService } from '../../core/services/cartones.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrl: './partida.component.css',
})
export class PartidaComponent {
  cartonesService = inject(CartonesService);

  ngOnInit() {
    this.cartonesService.ad = 'Gira la bola';
  }
}
