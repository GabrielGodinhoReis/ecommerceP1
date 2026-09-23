import { Component, computed, inject } from '@angular/core';

import { BackButton } from '../../components/back-button/back-button';

import { EcommerceStore } from '../../ecommerce-store';

import { ProductCard } from '../../components/product-card/product-card';

import { MatIcon } from '@angular/material/icon';

import { MatIconButton } from '@angular/material/button';

import { EmptyWishlist } from './empty-wishlist/empty-wishlist';

@Component({
  imports: [BackButton, ProductCard, MatIcon, MatIconButton, EmptyWishlist],
  selector: 'app-my-wishlist',
  styles: `
    :host {
      display: block;
    }
  `,
  template: `
    <div class="mx-auto max-w-[1200px] py-6 px-4">
      <app-back-button class="mb-6" navigateTo="/products/Games">
        Continue Comprando
      </app-back-button>

      @if (store.wishlistCount() > 0) {
        <div
          class="
            flex
            flex-col
            gap-4
            mb-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            class="
              flex
              items-center
              justify-between
              gap-4
              min-w-0
            "
          >
            <h1
              class="
                text-2xl
                font-bold
                whitespace-nowrap
              "
            >
              Lista de Desejos
            </h1>

            <span
              class="
                text-gray-500
                text-xl
                whitespace-nowrap
              "
            >
              {{ filteredWishlist().length }} Jogos
            </span>
          </div>

          <button
            matButton
            type="button"
            class="!bg-gray-700 !text-[#ef4444] !flex !items-center !justify-center !gap-2 !rounded-xl !px-5 !py-2.5 font-medium shadow-sm transition-all duration-200 hover:!bg-[#ef4444] hover:!text-white w-full sm:w-auto"
            (click)="store.clearWishlist()"
          >
            <mat-icon class="!m-0 !flex !items-center !justify-center !text-[20px] !leading-none">
              delete_sweep
            </mat-icon>

            <span class="!leading-none"> Remover Todos os Jogos da Lista de Desejos </span>
          </button>
        </div>

        <div
          class="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          @for (product of filteredWishlist(); track product.id) {
            <app-product-card
              [product]="product"
              (addToCartClicked)="store.removeFromWishlistWithoutMessage(product)"
            >
              <button
                matIconButton
                class="
                  !absolute
                  z-10
                  top-3
                  right-3
                  w-10
                  h-10
                  rounded-full
                  !bg-gray-900
                "
                (click)="store.removeFromWishlist(product)"
              >
                <mat-icon class="!text-white"> delete </mat-icon>
              </button>
            </app-product-card>
          }
        </div>

        @if (filteredWishlist().length === 0) {
          <div
            class="
              flex
              flex-col
              items-center
              justify-center
              py-16
              text-center
              text-gray-white
            "
          >
            <mat-icon
              class="
                !text-5xl
                !w-12
                !h-12
                mb-4
              "
            >
              search_off
            </mat-icon>

            <p class="text-lg">Nenhum jogo encontrado.</p>

            <p class="text-sm mt-1">Tente pesquisar por outro nome.</p>
          </div>
        }
      } @else {
        <app-empty-wishlist />
      }
    </div>
  `,
})
export default class MyWishlist {
  store = inject(EcommerceStore);

  filteredWishlist = computed(() => {
    const search = this.store.searchTerm().trim().toLowerCase();

    const wishlist = this.store.wishlistItems();

    if (!search) {
      return wishlist;
    }

    return wishlist.filter((product) => product.name.toLowerCase().includes(search));
  });
}
