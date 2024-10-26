import { CanMatchFn } from '@angular/router';
import { CartonesService } from '../services/cartones.service';
import { inject } from '@angular/core';

export const cartonesGuard: CanMatchFn = (route, segments) => {
  const cartonesService = inject(CartonesService);

  return cartonesService.conf.isGameActive;
};
