import { Component, inject, signal } from '@angular/core';

import { ProductCard } from '../../components/product-card/product-card';

import {
  MatSidenavContainer,
  MatSidenavContent,
  MatSidenav
} from '@angular/material/sidenav';

import {
  MatNavList,
  MatListItem,
  MatListItemTitle
} from '@angular/material/list';

import { RouterLink, ActivatedRoute } from '@angular/router';

import { EcommerceStore } from '../../ecommerce-store';

@Component({
  imports: [
    ProductCard,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
  ],

  selector: 'app-products-grid',

  providers: [EcommerceStore],

  template: `
    <mat-sidenav-container class="h-full overflow-hidden">

      <mat-sidenav mode="side" opened="true">

        <div class="p-6">

          <h2 class="menu-title">
            Nosso Catálogo
          </h2>

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
                  categoria === 'Todos os Jogos'
                    ? ['/products/Games']
                    : ['/products', categoria]
                "
              >

                <span
                  matListItemTitle
                  class="font-medium"
                >
                  {{ categoria }}
                </span>

              </a>

            }

          </mat-nav-list>

        </div>

      </mat-sidenav>

      <mat-sidenav-content class="bg-[#0f1117] p-6 overflow-y-auto">

        <div class="bg-[#0f1117] p-6">

          <h1 class="text-2xl font-bold text-white mb-1">
            {{ store.category() }}
          </h1>

        </div>

        @if (
          store.category() === 'Games' &&
          store.carouselProducts().length > 0
        ) {

          <div class="recommendations">

            <h2 class="recommendations-title">
              VEM VER NOSSAS RECOMENDAÇÕES!
            </h2>

            <div class="carousel-wrapper">

              @if (store.carouselProducts().length > 1) {

                <div class="side-card left-card">

                  <img
                    [src]="
                      store.carouselProducts()[previousGameIndex].bannerUrl
                    "
                    [alt]="
                      store.carouselProducts()[previousGameIndex].name
                    "
                  />

                </div>

              }

              <section class="carousel">

                <div class="carousel-image-wrapper">

                  <!-- IMAGEM ATUAL -->
                  <img
                    class="carousel-image"
                    [class.image-visible]="currentImageVisible()"
                    [src]="currentImage()"
                    [alt]="currentGameData?.name"
                  />

                  <!-- NOVA IMAGEM -->
                  <img
                    class="carousel-image"
                    [class.image-visible]="nextImageVisible()"
                    [src]="nextImage()"
                    [alt]="nextGameData?.name"
                  />

                </div>

                <div class="carousel-overlay">

                  <div class="carousel-info">

                    <h2>
                      {{ currentGameData?.name }}
                    </h2>

                    <p>
                      {{ currentGameData?.description }}
                    </p>

                    <div class="carousel-bottom">

                      <span class="carousel-price">
                        R$
                        {{
                          currentGameData?.price
                            ?.toFixed(2)
                            ?.replace('.', ',')
                        }}
                      </span>

                      <button class="carousel-buy-button">
                        Comprar
                      </button>

                    </div>

                  </div>

                </div>

                <button
                  class="carousel-button prev"
                  (click)="previousGame()"
                >
                  ❮
                </button>

                <button
                  class="carousel-button next"
                  (click)="nextGame()"
                >
                  ❯
                </button>

              </section>

              @if (store.carouselProducts().length > 1) {

                <div class="side-card right-card">

                  <img
                    [src]="
                      store.carouselProducts()[nextGameIndex].bannerUrl
                    "
                    [alt]="
                      store.carouselProducts()[nextGameIndex].name
                    "
                  />

                </div>

              }

            </div>

          </div>

        }

        <p class="text-base text-gray-600 mb-6">
          {{ store.filteredProducts().length }} Jogos
        </p>

        <div class="responsive-grid">

          @for (
            product of store.filteredProducts();
            track product.id
          ) {

            <app-product-card
              [product]="product"
            />

          }

        </div>

      </mat-sidenav-content>

    </mat-sidenav-container>
  `,
})
export default class ProductsGrid {

  store = inject(EcommerceStore);

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

    const secondGame =
      games[order.length > 1 ? order[1] : order[0]];

    this.currentImage.set(
      firstGame.bannerUrl
    );

    this.nextImage.set(
      secondGame.bannerUrl
    );

    this.currentImageVisible.set(true);

    this.nextImageVisible.set(false);

  }

  get currentGameData() {

    const games = this.store.carouselProducts();

    const order = this.carouselOrder();

    if (
      games.length === 0 ||
      order.length === 0
    ) {
      return undefined;
    }

    return games[
      order[this.carouselIndex()]
    ];

  }

  get nextGameData() {

    const games = this.store.carouselProducts();

    const order = this.carouselOrder();

    if (
      games.length === 0 ||
      order.length === 0
    ) {
      return undefined;
    }

    const nextPosition =
      this.carouselIndex() === order.length - 1
        ? 0
        : this.carouselIndex() + 1;

    return games[
      order[nextPosition]
    ];

  }

  get previousGameIndex(): number {

    const games = this.store.carouselProducts();

    const order = this.carouselOrder();

    if (
      games.length === 0 ||
      order.length === 0
    ) {
      return 0;
    }

    const previousPosition =
      this.carouselIndex() === 0
        ? order.length - 1
        : this.carouselIndex() - 1;

    return order[previousPosition];

  }

  get nextGameIndex(): number {

    const games = this.store.carouselProducts();

    const order = this.carouselOrder();

    if (
      games.length === 0 ||
      order.length === 0
    ) {
      return 0;
    }

    const nextPosition =
      this.carouselIndex() === order.length - 1
        ? 0
        : this.carouselIndex() + 1;

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

    if (
      order.length === 0 ||
      this.changingImage
    ) {
      return;
    }

    const newIndex =
      this.carouselIndex() === 0
        ? order.length - 1
        : this.carouselIndex() - 1;

    this.changeImage(newIndex);

  }

  nextGame() {

    const order = this.carouselOrder();

    if (
      order.length === 0 ||
      this.changingImage
    ) {
      return;
    }

    const newIndex =
      this.carouselIndex() === order.length - 1
        ? 0
        : this.carouselIndex() + 1;

    this.changeImage(newIndex);

  }

  changeImage(index: number) {

    const games = this.store.carouselProducts();

    const order = this.carouselOrder();

    if (
      games.length === 0 ||
      order.length === 0 ||
      this.changingImage
    ) {
      return;
    }

    this.changingImage = true;

    const newRealIndex = order[index];

    /*
     * Prepara a nova imagem ANTES da animação.
     */
    this.nextImage.set(
      games[newRealIndex].bannerUrl
    );

    this.carouselIndex.set(index);

    requestAnimationFrame(() => {

      this.nextImageVisible.set(true);

      this.currentImageVisible.set(false);

    });

    setTimeout(() => {

      this.currentImage.set(
        games[newRealIndex].bannerUrl
      );

      this.currentImageVisible.set(true);

      this.nextImageVisible.set(false);

      this.changingImage = false;

      this.startAutoPlay();

    }, 400);

  }

  /*
   * Permite ir diretamente para uma posição.
   */
  goToGame(index: number) {

    this.changeImage(index);

  }

}