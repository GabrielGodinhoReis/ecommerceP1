import { Component, ChangeDetectorRef, effect, inject, signal } from '@angular/core';

import { ProductCard } from '../../components/product-card/product-card';

import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';

import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';

import { RouterLink, ActivatedRoute } from '@angular/router';

import { EcommerceStore } from '../../ecommerce-store';

import { TitleCasePipe } from '@angular/common';

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

  styles: ``,

  providers: [EcommerceStore],

  template: `
    <mat-sidenav-container class="h-full overflow-hidden">
      <mat-sidenav mode="side" opened="true">
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
                <span
                  matListItemTitle
                  class="font-medium"
                  [class]="categoria === store.category() ? '!text-white' : null"
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

        @if (store.category() === 'Games' && store.carouselProducts().length > 0) {
          <div class="recommendations">
            <h2 class="recommendations-title">VEM VER NOSSAS RECOMENDAÇÕES!</h2>

            <div class="carousel-wrapper">
              @if (store.carouselProducts().length > 1) {
                <div class="side-card left-card">
                  <img
                    [src]="store.carouselProducts()[previousIndex].bannerUrl"
                    [alt]="store.carouselProducts()[previousIndex].name"
                  />
                </div>
              }

              <section class="carousel">
                <img
                  class="carousel-image"
                  [src]="store.carouselProducts()[carouselIndex()].bannerUrl"
                  [alt]="store.carouselProducts()[carouselIndex()].name"
                />

                <div class="carousel-overlay">
                  <div class="carousel-info">
                    <h2>
                      {{ store.carouselProducts()[carouselIndex()].name }}
                    </h2>

                    <p>
                      {{ store.carouselProducts()[carouselIndex()].description }}
                    </p>

                    <div class="carousel-bottom">
                      <span class="carousel-price">
                        R$
                        {{
                          store
                            .carouselProducts()
                            [carouselIndex()].price.toFixed(2)
                            .replace('.', ',')
                        }}
                      </span>

                      <button class="carousel-buy-button">Comprar</button>
                    </div>
                  </div>
                </div>

                <button class="carousel-button prev" (click)="previousGame()">❮</button>

                <button class="carousel-button next" (click)="nextGame()">❯</button>
              </section>

              @if (store.carouselProducts().length > 1) {
                <div class="side-card right-card">
                  <img
                    [src]="store.carouselProducts()[nextIndex].bannerUrl"
                    [alt]="store.carouselProducts()[nextIndex].name"
                  />
                </div>
              }
            </div>
          </div>
        }

        <p class="text-base text-gray-600 mb-6">{{ store.filteredProducts().length }} Jogos</p>

        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export default class ProductsGrid {
  store = inject(EcommerceStore);

  route = inject(ActivatedRoute);

  cdr = inject(ChangeDetectorRef);

  carouselIndex = signal(0);

  autoPlayTimer: any;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const categoria = params.get('category');

      if (categoria) {
        this.store.setCategory(categoria);
      }
    });

    this.startAutoPlay();
  }

  startAutoPlay() {
    clearTimeout(this.autoPlayTimer);

    this.autoPlayTimer = setTimeout(() => {
      this.nextGame();

      this.startAutoPlay();
    }, 10000);
  }

  get previousIndex(): number {
    const games = this.store.carouselProducts();

    if (games.length === 0) {
      return 0;
    }

    return (this.carouselIndex() - 1 + games.length) % games.length;
  }

  get nextIndex(): number {
    const games = this.store.carouselProducts();

    if (games.length === 0) {
      return 0;
    }

    return (this.carouselIndex() + 1) % games.length;
  }

  previousGame() {
    const games = this.store.carouselProducts();

    if (games.length === 0) {
      return;
    }

    this.carouselIndex.set(
      this.carouselIndex() === 0 ? games.length - 1 : this.carouselIndex() - 1,
    );

    this.startAutoPlay();
  }

  nextGame() {
    const games = this.store.carouselProducts();

    if (games.length === 0) {
      return;
    }

    this.carouselIndex.set(
      this.carouselIndex() === games.length - 1 ? 0 : this.carouselIndex() + 1,
    );

    this.startAutoPlay();
  }

  goToGame(index: number) {
    this.carouselIndex.set(index);

    this.startAutoPlay();
  }
}
