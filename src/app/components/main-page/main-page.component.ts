import { Component, inject } from '@angular/core';
import { CartonesService } from '../../core/services/cartones.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  openConfModal: boolean = false;

  cartonesService = inject(CartonesService);
}
