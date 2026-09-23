import { Component, inject, signal } from '@angular/core';

import { ProductCard } from '../../components/product-card/product-card';

import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';

import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';

import { MatButton, MatIconButton } from '@angular/material/button';

import { MatIcon } from '@angular/material/icon';

import { RouterLink, ActivatedRoute } from '@angular/router';

import { EcommerceStore } from '../../ecommerce-store';

import { CartStore } from '../../cart-store';

import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';

@Component({
  imports: [
    ProductCard,
    ToggleWishlistButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    MatButton,
    MatIconButton,
    MatIcon,
    RouterLink,
  ],
  selector: 'app-products-grid',
  template: `
    <mat-sidenav-container class="!h-auto !min-h-0">
      <mat-sidenav #sidenav mode="over">
        <div class="p-6">
          <h2 class="menu-title">Nosso Catálogo</h2>

          <mat-nav-list>
            @for (categoria of store.Categorias(); track categoria) {
              <a
                mat-list-item
                [activated]="
                  categoria === 'Todos os Jogos'
                    ? store.category() === 'Games'
                    : categoria === store.category()
                "
                class="my-2"
                [routerLink]="
                  categoria === 'Todos os Jogos' ? ['/products/Games'] : ['/products', categoria]
                "
              >
                <span matListItemTitle class="font-medium">
                  {{ categoria }}
                </span>
              </a>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>

      <mat-sidenav-content
        class="
          bg-[#0f1117]
          p-6
        "
      >
        <div class="bg-[#0f1117] p-6">
          @if (store.category() !== 'Games') {
            <h1
              class="
                text-2xl
                font-bold
                text-white
                mb-1
                text-center
              "
            >
              {{ store.category() }}
            </h1>
          }
        </div>

        <!-- CARROSSEL -->

        @if (
          store.category() === 'Games' &&
          store.searchTerm() === '' &&
          store.carouselProducts().length > 0
        ) {
          <div class="recommendations">
            <h2 class="recommendations-title">VEM VER NOSSAS RECOMENDAÇÕES!</h2>

            <div class="carousel-wrapper">
              @if (store.carouselProducts().length > 1) {
                <div class="side-card left-card">
                  <img
                    [src]="store.carouselProducts()[previousGameIndex].bannerUrl"
                    [alt]="store.carouselProducts()[previousGameIndex].name"
                  />
                </div>
              }

              <section class="carousel">
                <a class="carousel-image-link" [routerLink]="['/product', currentGameData?.id]">
                  <img
                    class="carousel-image"
                    [class.image-visible]="currentImageVisible()"
                    [src]="currentImage()"
                    [alt]="currentGameData?.name"
                  />
                </a>

                <div class="carousel-overlay">
                  <div class="carousel-bottom">
                    <span
                      class="
                        carousel-price
                        cursor-pointer
                      "
                      [routerLink]="['/product', currentGameData?.id]"
                    >
                      R$
                      {{ currentGameData?.price?.toFixed(2)?.replace('.', ',') }}
                    </span>

                    <button
                      class="carousel-buy-button"
                      type="button"
                      (click)="addCurrentGameToCart()"
                    >
                      Comprar
                    </button>
                  </div>
                </div>

                <!-- ANTERIOR -->

                <button class="carousel-button prev" type="button" (click)="previousGame()">
                  ❮
                </button>

                <!-- PRÓXIMO -->

                <button class="carousel-button next" type="button" (click)="nextGame()">❯</button>
              </section>

              @if (store.carouselProducts().length > 1) {
                <div class="side-card right-card">
                  <img
                    [src]="store.carouselProducts()[nextGameIndex].bannerUrl"
                    [alt]="store.carouselProducts()[nextGameIndex].name"
                  />
                </div>
              }
            </div>
          </div>
        }

        <!-- QUANTIDADE DE JOGOS -->

        <p
          class="
            text-base
            text-gray-600
            mb-6
          "
        >
          {{ store.filteredProducts().length }} Jogos
        </p>

        <!-- GRID DE PRODUTOS -->

        @if (store.filteredProducts().length > 0) {
          <div class="responsive-grid">
            @for (product of store.filteredProducts(); track product.id) {
              <app-product-card [product]="product">
                <app-toggle-wishlist-button
                  !absolute
                  !z-10
                  !top-3
                  !right-3
                  !w-10
                  !h-10
                  !rounded-full
                  [product]="product"
                  [style.view-transition-name]="'wishlist-button-' + product.id"
                />
              </app-product-card>
            }
          </div>
        } @else {
          <div
            class="
              flex
              flex-col
              items-center
              justify-center
              py-16
              text-center
              text-white
            "
          >
            <mat-icon
              class="
                !text-5xl
                !w-12
                !h-12
                mb-4
                !text-gray-500
              "
            >
              search_off
            </mat-icon>

            <p class="text-lg">Nenhum jogo encontrado.</p>

            <p class="text-sm mt-1 text-gray-500">Tente pesquisar por outro nome.</p>
          </div>
        }
      </mat-sidenav-content>
    </mat-sidenav-container>

    <!-- BOTÃO ÚNICO DO MENU -->

    <button
      type="button"
      mat-icon-button
      style="
        position: fixed !important;
        top: 100px !important;
        z-index: 2147483647 !important;
        width: 40px !important;
        height: 40px !important;
        min-width: 40px !important;
        padding: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: #292929 !important;
        color: white !important;
        border: 1px solid #374151 !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
      "
      [style.left]="sidenav.opened ? '280px' : '20px'"
      (click)="sidenav.toggle()"
    >
      <mat-icon
        style="
          color: white !important;
          margin: 0 !important;
        "
      >
        {{ sidenav.opened ? 'chevron_left' : 'chevron_right' }}
      </mat-icon>
    </button>
  `,
})
export default class ProductsGrid {
  store = inject(EcommerceStore);

  cartStore = inject(CartStore);

  route = inject(ActivatedRoute);

  carouselIndex = signal(0);

  carouselOrder = signal<number[]>([]);

  currentImage = signal('');

  nextImage = signal('');

  currentImageVisible = signal(true);

  nextImageVisible = signal(false);

  autoPlayTimer: any;

  changingImage = false;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const categoria = params.get('category');

      if (categoria) {
        this.store.setCategory(categoria);
      }
    });

    this.loadCarousel();

    this.startAutoPlay();
  }

  loadCarousel() {
    const games = this.store.carouselProducts();

    if (games.length === 0) {
      return;
    }

    const order = games.map((_, index) => index);

    order.sort(() => Math.random() - 0.5);

    this.carouselOrder.set(order);

    this.carouselIndex.set(0);

    const firstGame = games[order[0]];

    const secondGame = games[order.length > 1 ? order[1] : order[0]];

    this.currentImage.set(firstGame.bannerUrl);

    this.nextImage.set(secondGame.bannerUrl);

    this.currentImageVisible.set(true);

    this.nextImageVisible.set(false);
  }

  get currentGameData() {
    const games = this.store.carouselProducts();

    const order = this.carouselOrder();

    if (games.length === 0 || order.length === 0) {
      return undefined;
    }

    return games[order[this.carouselIndex()]];
  }

  get nextGameData() {
    const games = this.store.carouselProducts();

    const order = this.carouselOrder();

    if (games.length === 0 || order.length === 0) {
      return undefined;
    }

    const nextPosition = this.carouselIndex() === order.length - 1 ? 0 : this.carouselIndex() + 1;

    return games[order[nextPosition]];
  }

  get previousGameIndex(): number {
    const games = this.store.carouselProducts();

    const order = this.carouselOrder();

    if (games.length === 0 || order.length === 0) {
      return 0;
    }

    const previousPosition =
      this.carouselIndex() === 0 ? order.length - 1 : this.carouselIndex() - 1;

    return order[previousPosition];
  }

  get nextGameIndex(): number {
    const games = this.store.carouselProducts();

    const order = this.carouselOrder();

    if (games.length === 0 || order.length === 0) {
      return 0;
    }

    const nextPosition = this.carouselIndex() === order.length - 1 ? 0 : this.carouselIndex() + 1;

    return order[nextPosition];
  }

  startAutoPlay() {
    clearTimeout(this.autoPlayTimer);

    this.autoPlayTimer = setTimeout(() => {
      this.nextGame();
    }, 10000);
  }

  previousGame() {
    const order = this.carouselOrder();

    if (order.length === 0 || this.changingImage) {
      return;
    }

    const newIndex = this.carouselIndex() === 0 ? order.length - 1 : this.carouselIndex() - 1;

    this.changeImage(newIndex);
  }

  nextGame() {
    const order = this.carouselOrder();

    if (order.length === 0 || this.changingImage) {
      return;
    }

    const newIndex = this.carouselIndex() === order.length - 1 ? 0 : this.carouselIndex() + 1;

    this.changeImage(newIndex);
  }

  changeImage(index: number) {
    // Proteção para Server-Side Rendering (Node.js)

    if (typeof window === 'undefined') {
      return;
    }

    const games = this.store.carouselProducts();

    const order = this.carouselOrder();

    if (games.length === 0 || order.length === 0 || this.changingImage) {
      return;
    }

    this.changingImage = true;

    const newRealIndex = order[index];

    this.nextImage.set(games[newRealIndex].bannerUrl);

    this.carouselIndex.set(index);

    requestAnimationFrame(() => {
      this.nextImageVisible.set(true);

      this.currentImageVisible.set(false);
    });

    setTimeout(() => {
      this.currentImage.set(games[newRealIndex].bannerUrl);

      this.currentImageVisible.set(true);

      this.nextImageVisible.set(false);

      this.changingImage = false;

      this.startAutoPlay();
    }, 300);
  }

  goToGame(index: number) {
    this.changeImage(index);
  }

  // ADICIONAR O JOGO ATUAL DO CARROSSEL AO CARRINHO

  addCurrentGameToCart() {
    const game = this.currentGameData;

    if (!game) {
      return;
    }

    this.cartStore.addToCart(game);
  }
}
