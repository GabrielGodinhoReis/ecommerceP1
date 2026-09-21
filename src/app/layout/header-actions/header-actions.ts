import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadge } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';

import { EcommerceStore } from '../../ecommerce-store';
import { CartStore } from '../../cart-store';

@Component({
  selector: 'app-header-actions',
  standalone: true,
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatBadge
  ],

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

      <button
        matIconButton
        routerLink="/cart"
        class="wishlist-button"
        [matBadge]="cartStore.cartCount()"
        [matBadgeHidden]="cartStore.cartCount() === 0"
      >
        <mat-icon>shopping_cart</mat-icon>
      </button>

      @if (store.user(); as user) {
        <span class="text-sm font-semibold text-white mx-2">{{ user.name }}</span>
        <button matButton (click)="store.signOut()">
          Sair
        </button>
      } @else {
        <button matButton (click)="openAuth('signin')">
          Entrar
        </button>

        <button matButton="filled" (click)="openAuth('signup')">
          Cadastrar
        </button>
      }

    </div>
  `,
})
export class HeaderActions {
  store = inject(EcommerceStore);
  cartStore = inject(CartStore);
  private dialog = inject(MatDialog);

  async openAuth(mode: 'signin' | 'signup') {
    const { default: SignInDialog } = await import('../../components/sign-in-dialog/sign-in-dialog');
    this.dialog.open(SignInDialog, {
      disableClose: true,
      data: { mode }
    });
  }
}