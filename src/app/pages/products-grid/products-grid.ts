import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemIcon, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({

  imports: [ ProductCard, MatSidenav, MatSidenavContainer, MatSidenavContent, MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe ],

  selector: 'app-products-grid',

  styles: ``,

  template: ` 

  <mat-sidenav-container class="h-screen">

    <mat-sidenav mode="side" opened="true">

      <div class="p-6">

        <h2 class="text-lg text-gray-900">

          Categorias

        </h2>

        <mat-nav-list>

          @for (categoria of Categorias(); track categoria) {

            <a mat-list-item [activated]="categoria === 'Todos os Jogos' ? category() === 'Games' : categoria === category()" class="my-2" [routerLink]="categoria === 'Todos os Jogos' ? ['/products/Games'] : ['/products', categoria]">

              <span matListItemTitle class="font-medium" [class]="categoria ===category() ? '!text-white': null">
                {{ categoria | titlecase}}
              </span>

            </a>

          }

        </mat-nav-list>

      </div>

    </mat-sidenav>

    <mat-sidenav-content class="bg-gray-100 p-6">

      <div class="bg-gray-100 p-6">

        <h1 class="text-2xl font-bold text-gray-900-mb-1">

          {{ category() | titlecase }}

        </h1>

      </div>
      <p class="text-base text-gray-600 mb-6">

       {{ filteredProducts().length }} Jogos

      </p>
      <div class="responsive-grid">

        @for (product of filteredProducts(); track product.id) {

          <app-product-card [product]="product" />

        }

      </div>

    </mat-sidenav-content>

  </mat-sidenav-container>

  `,

})

export default class ProductsGrid {

  category = input<string>('Games');

  products = signal<Product[]>([

  {
    id: '1',
    name: 'Stranger Than Haven',
    description: 'Chave digital de Stranger Than Haven para Steam.',
    price: 279.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/f34311be591e96ad5ff51892281121ee.jpg',
    rating: 4.8,
    reviewCount: 120,
    inStock: true,
    category: 'RPG'
  },

  {
    id: '2',
    name: 'Control Resonant',
    description: 'Chave digital de Control Resonant para Steam.',
    price: 229.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/eb6f134fbaf1c8e469b4b55fdd2eb951.jpg',
    rating: 4.9,
    reviewCount: 85,
    inStock: true,
    category: 'Hack and Slash'
  },

  {
    id: '3',
    name: 'Resident Evil 2',
    description: 'Chave digital de Resident Evil 2 para Steam.',
    price: 29.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/fb5b3b5d234aa718062e3b4f6c826e23.jpg',
    rating: 4.9,
    reviewCount: 340,
    inStock: true,
    category: 'Terror'
  },

  {
    id: '4',
    name: 'Elden Ring',
    description: 'Chave digital de Elden Ring para Steam.',
    price: 199.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/557fa68027943a8b0d3b66c4e72ff23b.jpg',
    rating: 4.8,
    reviewCount: 560,
    inStock: true,
    category: 'SoulsLike'
  },

  {
    id: '5',
    name: 'Cyberpunk 2077',
    description: 'Chave digital de Cyberpunk 2077 para Steam.',
    price: 119.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/f39b781760a403dedaa05587e8889c1a.jpg',
    rating: 4.7,
    reviewCount: 430,
    inStock: true,
    category: 'RPG'
  },

  {
    id: '6',
    name: 'Red Dead Redemption 2',
    description: 'Chave digital de Red Dead Redemption 2 para Steam.',
    price: 79.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/3940304b536796dcc176aa83203a3955.jpg',
    rating: 5.0,
    reviewCount: 620,
    inStock: true,
    category: 'Mundo Aberto'
  },

  {
    id: '7',
    name: 'God of War',
    description: 'Chave digital de God of War para Steam.',
    price: 99.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/5855660034a74cfe0e5fc8d57d17f4ac.jpg',
    rating: 4.5,
    reviewCount: 390,
    inStock: true,
    category: 'Ação e Aventura'
  },

  {
    id: '8',
    name: 'Silent Hill 2',
    description: 'Chave digital de Silent Hill 2 para Steam.',
    price: 139.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/23a8793d295f5804590d596981e50b26.jpg',
    rating: 4.6,
    reviewCount: 280,
    inStock: true,
    category: 'Terror'
  },

  {
    id: '9',
    name: 'The Witcher 3',
    description: 'Chave digital de The Witcher 3: Wild Hunt para Steam.',
    price: 39.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/2f87d717bf556321774d1b4975d2e1c1.jpg',
    rating: 4.9,
    reviewCount: 710,
    inStock: true,
    category: 'RPG'
  },

  {
    id: '10',
    name: 'Grand Theft Auto V',
    description: 'Chave digital de Grand Theft Auto V para Steam.',
    price: 79.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/af0a25e27510f77d97634a6bbe653b13.jpg',
    rating: 4.8,
    reviewCount: 540,
    inStock: true,
    category: 'Mundo Aberto'
  },

  {
    id: '11',
    name: 'Resident Evil 4',
    description: 'Chave digital de Resident Evil 4 para Steam.',
    price: 49.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/dc6ab89f835061d1d33e4e97cc60b126.jpg',
    rating: 4.9,
    reviewCount: 480,
    inStock: true,
    category: 'Terror'
  },

  {
    id: '12',
    name: 'Death Stranding',
    description: 'Chave digital de Death Stranding para Steam.',
    price: 49.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/34042c360d640bc6a90e04a4a329c906.jpg',
    rating: 4.8,
    reviewCount: 350,
    inStock: true,
    category: 'Mundo Aberto'
  },

  {
    id: '13',
    name: 'Death Stranding 2: On the Beach',
    description: 'Chave digital de Death Stranding 2: On the Beach para Steam.',
    price: 349.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/a8f1d3b1cb35d3163c9cc2d0adff2d8f.jpg',
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    category: 'Mundo Aberto'
  },

  {
    id: '14',
    name: 'Resident Evil Requiem',
    description: 'Chave digital de Resident Evil Requiem para Steam.',
    price: 299.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/956adefb0eb473d0cd054107659ab6fd.jpg',
    rating: 4.8,
    reviewCount: 95,
    inStock: true,
    category: 'Terror'
  },
  {
    id: '15',
    name: 'Devil May Cry 5',
    description: 'Chave digital de Devil May Cry 5 para Steam.',
    price: 49.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/48f80b634fc8d3d9ec00cb9f04956a6d.jpg',
    rating: 4.9,
    reviewCount: 520,
    inStock: true,
    category: 'Hack and Slash'
  },
  {
    id: '16',
    name: '007 First Light',
    description: 'Chave digital de 007 First Light para Steam.',
    price: 299.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/9cd0f2a7c17876d6721916f09bce496c.jpg',
    rating: 4.8,
    reviewCount: 80,
    inStock: true,
    category: 'Ação e Aventura'
  },
  {
    id: '17',
    name: 'Crimson Desert',
    description: 'Chave digital de Crimson Desert para Steam.',
    price: 249.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/11eab7be142d22a782ca3f424bbf71aa.jpg',
    rating: 4.8,
    reviewCount: 110,
    inStock: true,
    category: 'RPG'
  },
  {
    id: '18',
    name: 'The Blood of Dawnwalker',
    description: 'Chave digital de The Blood of Dawnwalker para Steam.',
    price: 299.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/d669de0c87e54ee486d3c07e18c53950.jpg',
    rating: 4.7,
    reviewCount: 75,
    inStock: true,
    category: 'RPG'
  },
  {
    id: '19',
    name: 'Onimusha: Way of the Sword',
    description: 'Chave digital de Onimusha: Way of the Sword para Steam.',
    price: 249.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/a3962c0ca7ca8033daaa9fac886e90b8.jpg',
    rating: 4.8,
    reviewCount: 90,
    inStock: true,
    category: 'Ação e Aventura'
  },
  {
    id: '20',
    name: 'Dark Souls Remastered',
    description: 'Chave digital de Dark Souls Remastered para Steam.',
    price: 119.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/fa09649961c5c38096ee815c1084b2f0.jpg',
    rating: 4.9,
    reviewCount: 850,
    inStock: true,
    category: 'SoulsLike'
  },
  {
    id: '21',
    name: 'Dark Souls II: Scholar of the First Sin',
    description: 'Chave digital de Dark Souls II: Scholar of the First Sin para Steam.',
    price: 79.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/30f52c42d71419a92405dd78a3ab4a9c.jpg',
    rating: 4.8,
    reviewCount: 720,
    inStock: true,
    category: 'SoulsLike'
  },
  {
    id: '22',
    name: 'Dark Souls III',
    description: 'Chave digital de Dark Souls III para Steam.',
    price: 129.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/9085f5ef67f2f7f0f38e869ffb5016a1.jpg',
    rating: 4.9,
    reviewCount: 920,
    inStock: true,
    category: 'SoulsLike'
  },
  {
    id: '23',
    name: 'Lies of P',
    description: 'Chave digital de Lies of P para Steam.',
    price: 149.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/f30394f6e75231e421bc9edb88f2c4aa.jpg',
    rating: 4.9,
    reviewCount: 680,
    inStock: true,
    category: 'SoulsLike'
  },
  {
    id: '24',
    name: 'Sekiro: Shadows Die Twice',
    description: 'Chave digital de Sekiro: Shadows Die Twice para Steam.',
    price: 129.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/e626e6c269451eb8d66f7a5f49473d3d.jpg',
    rating: 4.9,
    reviewCount: 980,
    inStock: true,
    category: 'SoulsLike'
  },
  {
    id: '25',
    name: 'God of War Ragnarök',
    description: 'Chave digital de God of War Ragnarök para Steam.',
    price: 149.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/fd93fd1de50e084dd7d3b0b9f6950450.jpg',
    rating: 4.9,
    reviewCount: 760,
    inStock: true,
    category: 'Ação e Aventura'
  },
  {
    id: '26',
    name: 'Phantom Blade Zero',
    description: 'Chave digital de Phantom Blade Zero para Steam.',
    price: 229.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/c2ca23c951caaa036189141224933bb8.jpg',
    rating: 4.8,
    reviewCount: 95,
    inStock: true,
    category: 'Ação e Aventura'
  },
  {
    id: '27',
    name: 'Baldur’s Gate 3',
    description: 'Chave digital de Baldur’s Gate 3 para Steam.',
    price: 149.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/5cdf5c84489e801e6bac5693b1c8e290.jpg',
    rating: 4.9,
    reviewCount: 1100,
    inStock: true,
    category: 'RPG'
  },
  {
    id: '28',
    name: 'Clair Obscur: Expedition 33',
    description: 'Chave digital de Clair Obscur: Expedition 33 para Steam.',
    price: 129.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/e7fff0c2739cf86c8aa5559eefe74220.jpg',
    rating: 4.9,
    reviewCount: 540,
    inStock: true,
    category: 'RPG'
  },
  {
    id: '29',
    name: 'Disco Elysium - The Final Cut',
    description: 'Chave digital de Disco Elysium - The Final Cut para Steam.',
    price: 19.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/e17233dc1c4e3457d5a259c06c7eb502.jpg',
    rating: 4.9,
    reviewCount: 610,
    inStock: true,
    category: 'RPG'
  },
  {
    id: '30',
    name: 'Batman: Arkham Asylum',
    description: 'Chave digital de Batman: Arkham Asylum para Steam.',
    price: 19.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/69fd92bd85b2c2d1267e63ff1df624ae.jpg',
    rating: 4.9,
    reviewCount: 780,
    inStock: true,
    category: 'Ação e Aventura'
  },
  {
    id: '31',
    name: 'Batman: Arkham City',
    description: 'Chave digital de Batman: Arkham City para Steam.',
    price: 29.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/428631981b73923e80d40f1b4e7033e9.jpg',
    rating: 4.9,
    reviewCount: 820,
    inStock: true,
    category: 'Ação e Aventura'
  },
  {
    id: '32',
    name: 'Batman: Arkham Knight',
    description: 'Chave digital de Batman: Arkham Knight para Steam.',
    price: 39.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/f84188cb2659a5c8c875d7f0e9fc847c.jpg',
    rating: 4.8,
    reviewCount: 750,
    inStock: true,
    category: 'Ação e Aventura'
  },
  {
    id: '33',
    name: 'Hades',
    description: 'Chave digital de Hades para Steam.',
    price: 19.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/a3e5b8833d2664729e19f21263f675a5.jpg',
    rating: 4.9,
    reviewCount: 890,
    inStock: true,
    category: 'Roguelike'
  },
  {
    id: '34',
    name: 'Hades II',
    description: 'Chave digital de Hades II para Steam.',
    price: 79.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/b2c6c5b4f6992b115368bcb678c4662a.jpg',
    rating: 4.9,
    reviewCount: 420,
    inStock: true,
    category: 'Roguelike'
  },
  {
    id: '35',
    name: 'Hollow Knight',
    description: 'Chave digital de Hollow Knight para Steam.',
    price: 19.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/d18c832e8c956b4ef8b92862e6bf470d.jpg',
    rating: 4.9,
    reviewCount: 1200,
    inStock: true,
    category: 'Metroidvania'
  },
  {
    id: '36',
    name: 'Hollow Knight: Silksong',
    description: 'Chave digital de Hollow Knight: Silksong para Steam.',
    price: 89.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/48b505846f30602aaff7e2d336720e6d.jpg',
    rating: 4.9,
    reviewCount: 350,
    inStock: true,
    category: 'Metroidvania'
  },
  {
    id: '37',
    name: 'Balatro',
    description: 'Chave digital de Balatro para Steam.',
    price: 29.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/e4b3f4132352654ef0191fc20d3767c8.jpg',
    rating: 4.9,
    reviewCount: 730,
    inStock: true,
    category: 'Roguelike'
  },
  {
    id: '38',
    name: 'Cuphead',
    description: 'Chave digital de Cuphead para Steam.',
    price: 39.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/25dcf1554f13c36b512dfe907acc77d3.jpg',
    rating: 4.9,
    reviewCount: 680,
    inStock: true,
    category: 'Ação e Aventura'
  },
  {
    id: '39',
    name: 'Grand Theft Auto: San Andreas',
    description: 'Chave digital de Grand Theft Auto: San Andreas para Steam.',
    price: 99.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/4b7890d268495230ee3f9bcd05ce3365.png',
    rating: 4.9,
    reviewCount: 950,
    inStock: true,
    category: 'Mundo Aberto'
  },
  {
    id: '40',
    name: 'Grand Theft Auto: Vice City',
    description: 'Chave digital de Grand Theft Auto: Vice City para Steam.',
    price: 99.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/a0b245148e6b663a16a5bb5dad7e9f04.jpg',
    rating: 4.8,
    reviewCount: 820,
    inStock: true,
    category: 'Mundo Aberto'
  },
  {
    id: '41',
    name: 'Grand Theft Auto III',
    description: 'Chave digital de Grand Theft Auto III para Steam.',
    price: 99.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/4dbc59d0ce072429187017a0ae46bccb.jpg',
    rating: 4.8,
    reviewCount: 760,
    inStock: true,
    category: 'Mundo Aberto'
  },
  {
    id: '42',
    name: 'Grand Theft Auto IV',
    description: 'Chave digital de Grand Theft Auto IV para Steam.',
    price: 39.90,
    imageUrl: 'https://cdn2.steamgriddb.com/thumb/a32bc8141e168ff20fdfe3f0fbc72155.jpg',
    rating: 4.9,
    reviewCount: 880,
    inStock: true,
    category: 'Mundo Aberto'
  },
]);

  Categorias = computed(() => {

  const categorias = this.products().map(p => p.category);

  return ['Todos os Jogos', ...[...new Set(categorias)].sort()];

  });

  filteredProducts = computed(() => {

  const categoria = this.category().toLowerCase();

  if (categoria === 'todos' || categoria === 'games') {

  return [...this.products()].sort((a, b) => a.name.localeCompare(b.name));

  }

  return [...this.products()]

    .filter(p => p.category.toLowerCase() === categoria)

    .sort((a, b) => a.name.localeCompare(b.name));

  });

}