import { Component, inject } from '@angular/core';
import { BackButton } from '../../components/back-button/back-button';
import { EcommerceStore } from '../../ecommerce-store';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  imports: [BackButton, ProductCard],
  selector: 'app-my-wishlist',
  styles: ``,
  template: ` 
  <div class="mx-auto max-w-[1200px] py-6 px-4">
    <app-back-button class="mb-6" navigateTo="/products/Games">
      Continue Comprando
    </app-back-button>

    @if (store.wishlistCount() > 0) {
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Lista de Desejos</h1>
        <span class="text-gray-500 text-xl">
          {{ store.wishlistCount() }} Jogos
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (product of store.wishlistItems(); track product.id) {
          <app-product-card [product]="product"></app-product-card>
        }
      </div>
    } @else {

    }

  </div> `,
})
export default class MyWishlist {
  store = inject(EcommerceStore);
}
