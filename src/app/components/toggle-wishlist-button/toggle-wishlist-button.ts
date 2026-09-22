import { Component, computed, inject, input } from '@angular/core';

import { EcommerceStore } from '../../ecommerce-store';

import { Product } from '../../models/product';

import { MatIcon } from '@angular/material/icon';

import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  imports: [MatIconButton, MatIcon, MatButton],

  selector: 'app-toggle-wishlist-button',

  styles: ``,

  template: `
    <button
      class="right-3 w-10 h-10 rounded-full !bg-gray-900 border-0 shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg"
      [class.!text-red-500]="isInWishlist()"
      [class.!text-gray-400]="!isInWishlist()"
      matIconButton
      (click)="toggleWishlist()"
    >
      <mat-icon [class.!text-white]="!isInWishlist()" [class.!text-purple-500]="isInWishlist()">
        {{ isInWishlist() ? 'favorite' : 'favorite_border' }}
      </mat-icon>
    </button>
  `,
})
export class ToggleWishlistButton {
  product = input.required<Product>();

  store = inject(EcommerceStore);

  isInWishlist = computed(() => this.store.wishlistItems().find((p) => p.id === this.product().id));

  toggleWishlist() {
    if (this.isInWishlist()) {
      this.store.removeFromWishlist(this.product());
    } else {
      this.store.addtoWishlist(this.product());
    }
  }
}
