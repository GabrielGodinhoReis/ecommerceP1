import { Component, inject } from '@angular/core';

import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';

import { EcommerceStore } from '../../ecommerce-store';

@Component({
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatBadge
  ],

  selector: 'app-header-actions',

  styles: `
    :host {
      display: block;
    }

    .wishlist-button {
      position: relative;
    }

    ::ng-deep .wishlist-button .mat-badge-content {
      font-size: 10px !important;
      width: 16px !important;
      height: 16px !important;
      line-height: 16px !important;
      min-width: 16px !important;
      padding: 0 !important;
      border-radius: 50%;
    }
  `,

  template: `
    <div class="flex items-center gap-2">

      <button
        matIconButton
        routerLink="/wishlist"
        class="wishlist-button"
        [matBadge]="store.wishlistCount()"
        [matBadgeHidden]="store.wishlistCount() === 0"
      >
        <mat-icon>favorite</mat-icon>
      </button>

      <button matIconButton>
        <mat-icon>shopping_cart</mat-icon>
      </button>

      <button matButton>
        Entrar
      </button>

      <button matButton="filled">
        Cadastrar
      </button>

    </div>
  `,
})
export class HeaderActions {
  store = inject(EcommerceStore);
}
