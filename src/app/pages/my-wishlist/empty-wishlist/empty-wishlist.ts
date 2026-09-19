import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-wishlist',
  imports: [MatIcon, MatButton, RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center py-16 text-center">

      <div class="w-20 h-20 mb-8 rounded-full bg-[#8b5cf6] flex items-center justify-center">
        <mat-icon class="!text-white transform scale-150">
          favorite_border
        </mat-icon>
      </div>

      <h2 class="text-2xl font-bold text-white mb-3">
        Sua Lista de Desejos está vazia
      </h2>

      <p class="text-white mb-8">
        Salve os Jogos que você gostar para ver depois!
      </p>

      <button
        matButton="filled"
        routerLink="/products/Games"
        class="-ms-2 flex items-center gap-2 rounded-xl !bg-gray-700 !px-4 !py-2 !text-sm !font-medium !text-gray-100 shadow-sm transition-all duration-200 hover:!bg-[#8b5cf6] hover:!shadow-md active:scale-95"
      >
        Confira Nossas Ofertas
      </button>

    </div>
  `,
  styles: ``
})
export class EmptyWishlist {}