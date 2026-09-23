import { Component, inject } from '@angular/core';

import {
  MatButton,
  MatIconButton,
} from '@angular/material/button';

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
    MatBadge,
  ],

  styles: `
    :host {
      display: block;
      min-width: 0;
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

    @media (max-width: 768px) {
      ::ng-deep .header-action-button {
        min-width: auto !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
      }
    }

    @media (max-width: 480px) {
      ::ng-deep .header-action-button {
        padding-left: 5px !important;
        padding-right: 5px !important;
      }

      ::ng-deep .header-icon-button {
        width: 40px !important;
        height: 40px !important;
        padding: 8px !important;
      }

      ::ng-deep .header-icon-button .mat-icon {
        font-size: 21px !important;
        width: 21px !important;
        height: 21px !important;
      }
    }

    @media (max-width: 400px) {
      ::ng-deep .header-action-button {
        font-size: 12px !important;
      }

      ::ng-deep .header-icon-button {
        width: 36px !important;
        height: 36px !important;
        padding: 6px !important;
      }

      ::ng-deep .header-icon-button .mat-icon {
        font-size: 20px !important;
        width: 20px !important;
        height: 20px !important;
      }
    }
  `,

  template: `
    <div
      class="
        flex
        items-center
        gap-1
        sm:gap-2
        min-w-0
      "
    >

      <!-- WISHLIST -->

      <button
        matIconButton
        routerLink="/wishlist"
        class="
          wishlist-button
          header-icon-button
          shrink-0
        "
        [matBadge]="store.wishlistCount()"
        [matBadgeHidden]="store.wishlistCount() === 0"
      >
        <mat-icon>
          favorite
        </mat-icon>
      </button>


      <!-- CARRINHO -->

      <button
        matIconButton
        routerLink="/cart"
        class="
          wishlist-button
          header-icon-button
          shrink-0
        "
        [matBadge]="cartStore.cartCount()"
        [matBadgeHidden]="cartStore.cartCount() === 0"
      >
        <mat-icon>
          shopping_cart
        </mat-icon>
      </button>


      <!-- USUÁRIO LOGADO -->

      @if (store.user(); as user) {

        <!-- NOME -->

        <span
          class="
            inline
            text-sm
            font-semibold
            text-white
            mx-1
            lg:mx-2
            max-w-[150px]
            truncate
          "
          [title]="user.name"
        >
          {{ user.name }}
        </span>


        <!-- SAIR -->

        <button
          matButton
          class="
            header-action-button
            shrink-0
          "
          (click)="store.signOut()"
        >
          Sair
        </button>

      } @else {

        <!-- ENTRAR -->

        <button
          matButton
          class="
            header-action-button
            shrink-0
          "
          (click)="openAuth('signin')"
        >
          Entrar
        </button>


        <!-- CADASTRAR -->

        <button
          matButton="filled"
          class="
            header-action-button
            shrink-0
          "
          (click)="openAuth('signup')"
        >
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


  async openAuth(
    mode: 'signin' | 'signup'
  ) {

    const { default: SignInDialog } =
      await import(
        '../../components/sign-in-dialog/sign-in-dialog'
      );

    this.dialog.open(SignInDialog, {
      disableClose: true,
      data: {
        mode,
      },
    });

  }

}