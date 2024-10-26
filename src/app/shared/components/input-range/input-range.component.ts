import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrl: './input-range.component.css',
})
export class InputRangeComponent {
  @Input() name: string = '';
  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 0;

  showCurrentValue: boolean = false;

  @Output() newCant = new EventEmitter<number>();

  changeCant() {
    this.newCant.emit(this.value);
  }
}
