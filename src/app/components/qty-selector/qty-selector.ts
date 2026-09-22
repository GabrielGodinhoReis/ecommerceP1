import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-qty-selector',
  imports: [MatIcon, MatIconButton],
  template: `
    <div class="flex items-center gap-3">

      <button
        mat-icon-button
        [disabled]="quantity() === 1"
        (click)="qtyUpdated.emit(quantity() - 1)"
      >
        <mat-icon>remove</mat-icon>
      </button>

      <div class="px-3">
        {{ quantity() }}
      </div>

      <button
        mat-icon-button
        (click)="qtyUpdated.emit(quantity() + 1)"
      >
        <mat-icon>add</mat-icon>
      </button>

    </div>
  `,
  styles: ``
})
export class QtySelector {
  quantity = input(0);
  qtyUpdated = output<number>();
}
