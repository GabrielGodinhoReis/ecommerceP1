import { Component, inject } from '@angular/core';

import { MatToolbar } from '@angular/material/toolbar';

import { MatIcon } from '@angular/material/icon';

import { HeaderActions } from '../header-actions/header-actions';

import {
  isActive,
  Router,
  RouterLink,
} from '@angular/router';

import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    HeaderActions,
    RouterLink,
  ],
  styles: `
    .gaming-title {
      font-size: 22px;
      font-weight: 700;
      color: white;
      letter-spacing: -0.5px;
      white-space: nowrap;
    }

    .hub-badge {
      color: #8b5cf6;
    }

    .header {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      z-index: 2147483647 !important;
    }

    .header-content {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
    }

    /* PESQUISA */

    .search-container {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 40px;
    }

    /* AÇÕES */

    .header-actions {
      margin-left: auto;
      min-width: 0;
      max-width: 100%;
    }

    /* QUANDO A BARRA DESCE */

    @media (max-width: 1000px) {
      .header {
        height: auto !important;
        min-height: 0 !important;
        padding-top: 8px;
        padding-bottom: 8px;
      }

      .header-content {
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px 20px;
      }

      .header-actions {
        margin-left: 0;
        max-width: 100%;
      }

      .search-container {
        position: static;
        transform: none;
        order: 3;
        flex-basis: 100%;
        width: 400px;
        max-width: 100%;
        margin: 0 auto;
        height: 40px;
      }
    }

    /* VAI DIMINUINDO CONFORME A TELA DIMINUI */

    @media (max-width: 600px) {
      .gaming-title {
        font-size: 20px;
      }

      .header-content {
        gap: 8px 16px;
      }

      .header-actions {
        flex-shrink: 1;
        overflow: visible;
      }

      .search-container {
        height: 38px;
      }
    }

    @media (max-width: 450px) {
      .gaming-title {
        font-size: 18px;
      }

      .header-content {
        gap: 8px 12px;
      }

      .header-actions {
        flex-shrink: 1;
        overflow: visible;
      }

      .search-container {
        height: 36px;
      }
    }
  `,
  template: `
    <mat-toolbar
      id="main-header"
      class="
        header
        w-full
        elevated
        py-2
      "
    >
      <div class="header-content">

        <!-- LOGO -->

        <a
          routerLink="/"
          class="
            no-underline
            cursor-pointer
            shrink-0
          "
        >
          <span class="gaming-title">
            Gaming
            <span class="hub-badge !text-white">
              Hub
            </span>
          </span>
        </a>

        <!-- PESQUISA -->

        @if (showSearch()) {
          <div
            class="
              search-container
              flex
              items-center
              bg-[#292929]
              border
              border-gray-700
              rounded-lg
              px-3
            "
          >
            <mat-icon
              class="
                !text-gray-400
                shrink-0
              "
            >
              search
            </mat-icon>

            <input
              type="text"
              placeholder="Pesquisar Jogos..."
              class="
                w-full
                min-w-0
                bg-transparent
                outline-none
                border-none
                text-white
                px-2
                placeholder:text-gray-500
              "
              [value]="store.searchTerm()"
              (input)="onSearch($event)"
            />
          </div>
        }

        <!-- AÇÕES -->

        <div class="header-actions shrink-0">
          <app-header-actions />
        </div>

      </div>
    </mat-toolbar>
  `,
})
export class Header {
  store = inject(EcommerceStore);

  private router = inject(Router);

  isCart = isActive('/cart', this.router, {
    paths: 'subset',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  });

  isCheckout = isActive('/checkout', this.router, {
    paths: 'subset',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  });

  showSearch = () => {
    return !this.isCart() && !this.isCheckout();
  };

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;

    const search = input.value;

    this.store.setSearchTerm(search);

    if (this.store.category() !== 'Games') {
      this.router.navigate(['/products/Games']);
    }
  }
}