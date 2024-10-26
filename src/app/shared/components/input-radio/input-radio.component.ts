import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.css',
})
export class InputRadioComponent {
  @Input() idRadio: string = '';
  @Input() visibleName: string = '';
  @Input() name: string = '';
  @Input() value: any = '';
  @Input() checked: boolean = false;

  @Output() changeRadioValue = new EventEmitter<string>();

  changeRadio() {
    this.changeRadioValue.emit(this.value);
  }
}
