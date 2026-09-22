import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatIcon],
  selector: 'app-stock-status',
  styles: `
    .stock-text {
      font-size: 12px !important;
      line-height: 1.2 !important;
      font-weight: 500 !important;
    }
  `,
  host: {
    class: 'block',
  },
  template: `
    @if (inStock()) {
      <div class="inline-flex items-center gap-2 rounded-md bg-purple-600 px-3 py-2">
        <mat-icon class="!text-white !text-[18px] !w-[18px] !h-[18px]">
          check_circle
        </mat-icon>

        <span class="stock-text text-white">
          Disponível em estoque.<br />
          Adicione ao carrinho para comprar.
        </span>
      </div>
    } @else {
      <div class="inline-flex items-center gap-2 rounded-md bg-purple-600 px-3 py-2">
        <mat-icon class="!text-red-300 !text-[18px] !w-[18px] !h-[18px]">
          warning
        </mat-icon>

        <span class="stock-text text-white">
          Este jogo não está disponível no momento.<br />
          Adicione-o à sua Lista de Desejos para receber
          uma notificação quando estiver disponível novamente.
        </span>
      </div>
    }
  `,
})
export class StockStatus {
  inStock = input(false);
}