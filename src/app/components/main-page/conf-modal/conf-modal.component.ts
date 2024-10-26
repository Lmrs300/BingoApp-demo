import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { CartonesService } from './../../../core/services/cartones.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conf-modal',
  templateUrl: './conf-modal.component.html',
  styleUrl: './conf-modal.component.css',
})
export class ConfModalComponent {
  cartonesService = inject(CartonesService);
  router = inject(Router);
  @Input() openConfModal: boolean = false;
  @Output() closeConfModal = new EventEmitter<boolean>();

  gameConf = structuredClone(this.cartonesService.conf);

  isError = false;

  cartones = [
    {
      numCarton: 0,
      isPlayerCarton: false,
    },
  ];

  ngOnInit() {
    this.cartones = [];
    this.cartones = this.generateArrayCartones(this.gameConf.cantCartones);
  }

  saveConf(form: NgForm) {
    if (!this.cartones.some((carton) => carton.isPlayerCarton == true)) {
      this.isError = true;
      return;
    } else {
      this.isError = false;
    }
    this.gameConf.numPlayerCartones = this.cartones
      .filter((carton) => carton.isPlayerCarton == true)
      .map((carton) => carton.numCarton);
    this.cartonesService.saveConf(this.gameConf);
    this.openConfModal = false;
    this.cartonesService.startGame();
    this.router.navigate(['/partida']);
  }

  closeModal() {
    this.openConfModal = false;
    this.closeConfModal.emit();
    setTimeout(() => {
      this.gameConf = structuredClone(this.cartonesService.conf);
      this.isError = false;
      this.cartones = this.generateArrayCartones(this.gameConf.cantCartones);
    }, 400);
  }

  verifyCheck(e: Event, carton: any) {
    const input = e.target as HTMLInputElement;

    carton.isPlayerCarton = input.checked;

    if (!this.cartones.some((carton) => carton.isPlayerCarton == true)) {
      this.isError = true;
      return;
    } else {
      this.isError = false;
    }
  }

  disableButton() {
    return this.cartones.some((carton) => carton.isPlayerCarton == true);
  }

  generateArrayCartones(num: number) {
    return Array.from({ length: num }, (_, i) => ({
      numCarton: i + 1,
      isPlayerCarton: false,
    }));
  }

  changeCant(newCant: number) {
    this.gameConf.cantCartones = newCant;
    this.cartones = this.generateArrayCartones(newCant);
  }
}
