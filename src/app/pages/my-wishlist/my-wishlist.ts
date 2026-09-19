import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from '../../components/product-card/product-card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { EmptyWishlist } from './empty-wishlist/empty-wishlist';

@Component({
  imports: [
    BackButton,
    ProductCard,
    MatIcon,
    MatIconButton,
    EmptyWishlist
  ],
  selector: 'app-my-wishlist',
  styles: ``,
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">

      <app-back-button
        class="mb-6"
        navigateTo="/products/Games"
      >
        Continue Comprando
      </app-back-button>

      @if (store.wishlistCount() > 0) {

        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">
            Lista de Desejos
          </h1>

          <span class="text-gray-500 text-xl">
            {{ store.wishlistCount() }} Jogos
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          @for (product of store.wishlistItems(); track product.id) {

            <app-product-card [product]="product">

              <button
                class="!absolute z-10 top-3 right-3 w-10 h-10 rounded-full !bg-gray-900 border-0 shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg"
                matIconButton
                (click)="store.removeFromWishlist(product)"
              >
                <mat-icon class="!text-white">
                  delete
                </mat-icon>
              </button>

            </app-product-card>

          }

        </div>

        <div class="mt-8 flex justify-center">
          <button
            matButton="outline"
            class="!bg-gray-700 !border-[#ef4444] !text-[#ef4444] !flex !items-center !justify-center !gap-2 !rounded-xl !px-5 !py-2.5 font-medium shadow-sm hover:!bg-[#ef4444] hover:!text-white transition-all duration-200"
            (click)="store.clearWishlist()"
          >
            <mat-icon class="!m-0 !text-[20px]">
              delete_sweep
            </mat-icon>

            <span>
              Remover Todos os Jogos da Lista de Desejos
            </span>
          </button>
        </div>
      } @else {

        <app-empty-wishlist />

      }

    </div>
  `,
})
export default class MyWishlist {
  store = inject(EcommerceStore);
}