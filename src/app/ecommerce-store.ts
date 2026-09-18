import { computed, inject } from "@angular/core";
import { Product } from "./models/product";
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from "./services/toaster";

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root'
  },

  withState({
    products: [
      {
        id: '1',
        name: 'Stranger Than Haven',
        description: 'Chave digital de Stranger Than Haven para Steam.',
        price: 279.90,
        imageUrl: 'https://cdn2.steamgriddb.com/thumb/f34311be591e96ad5ff51892281121ee.jpg',
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/4260840/3e40b76faf9a3eafb4397dd51308eb2e48ac3666/header_2x.jpg?t=1784822692',
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
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3669870/13dfba3995a7781a3ada516f24ae0a17a4536886/header_2x.jpg?t=1765198498',
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
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1091500/e9047d8ec47ae3d94bb8b464fb0fc9e9972b4ac7/header_2x.jpg?t=1753355535',
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
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1850570/header_2x.jpg?t=1750697255',
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
        bannerUrl: 'https://cdn1.epicgames.com/spt-assets/3e0c82e7863e40818a56f934edc55712/project-murray-1ad3k.png',
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
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3768760/dbe86ebd2edb4c77d113e9e2feefeb90189fabc9/header_2x.jpg?t=1763663780',
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
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2638890/7b0993d5b7260711ad17aaf7b178ce72f5553796/header_2x.jpg?t=1755662593',
        rating: 4.8,
        reviewCount: 90,
        inStock: true,
        category: 'Ação e Aventura'
      },

      {
        id: '20',
        name: 'Dark Souls I Remastered',
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
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1086940/48a2fcbda8565bb45025e98fd8ebde8a7203f6a0/header_2x.jpg?t=1748345785',
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
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1903340/be3305b02d4db0dffa3458537118423bf2792d7e/header_2x.jpg?t=1753344054',
        rating: 4.9,
        reviewCount: 540,
        inStock: true,
        category: 'RPG'
      },

      {
        id: '29',
        name: 'Disco Elysium',
        description: 'Chave digital de Disco Elysium para Steam.',
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
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1145350/91ac334a2c137d08968ccc0bc474a02579602100/header_2x.jpg?t=1758926015',
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
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2379780/7a85430784e4d613cdb0547414d8cf16ffa45747/header_2x.jpg?t=1758034949',
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

      {
        id: '43',
        name: 'The Last Of Us Part I',
        description: 'Chave digital de The Last Of Us Part I para Steam.',
        price: 149.90,
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1888930/library_600x900_2x.jpg?t=1750958840',
        rating: 4.9,
        reviewCount: 1220,
        inStock: true,
        category: 'Ação e Aventura'
      },

      {
        id: '44',
        name: 'The Last Of Us Part II',
        description: 'Chave digital de The Last Of Us Part II para Steam.',
        price: 199.90,
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2531310/aeac394b61ac94b5d4ea939351baf3943ac0b282/library_600x900_2x.jpg?t=1750959100',
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2531310/header_2x.jpg?t=1750959100',
        rating: 5.0,
        reviewCount: 620,
        inStock: true,
        category: 'Ação e Aventura'
      },

      {
        id: '45',
        name: 'Alan Wake I Remastered',
        description: 'Chave digital de Alan Wake Remastered para Steam.',
        price: 19.90,
        imageUrl: 'https://cdn2.steamgriddb.com/thumb/f25f7b9e7ee973a3720e1261cf3a30c8.jpg',
        rating: 4.6,
        reviewCount: 340,
        inStock: true,
        category: 'Terror'
      },

      {
        id: '46',
        name: 'Alan Wake II',
        description: 'Chave digital de Alan Wake II para Steam.',
        price: 109.90,
        imageUrl: 'https://cdn2.steamgriddb.com/thumb/a7147fd59ab64d16e49e819733ad2187.jpg',
        bannerUrl: 'https://cdn1.epicgames.com/offer/c4763f236d08423eb47b4c3008779c84/EGS_AlanWake2_RemedyEntertainment_S1_2560x1440-ec44404c0b41bc457cb94cd72cf85872',
        rating: 5.0,
        reviewCount: 470,
        inStock: true,
        category: 'Terror'
      },

      {
        id: '47',
        name: 'Stella Blade',
        description: 'Chave digital de Stella Blade para Steam.',
        price: 219.90,
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3489700/6f2bbe8f34fc283f42acbe4ab184e9a40f76ad51/library_600x900_2x.jpg?t=1751863517',
        rating: 4.6,
        reviewCount: 520,
        inStock: true,
        category: 'Hack and Slash'
      },

      {
        id: '48',
        name: 'Control',
        description: 'Chave digital de Control para Steam.',
        price: 19.90,
        imageUrl: 'https://cdn2.steamgriddb.com/thumb/2e145040d573c3ef988ca1f2c701420f.jpg',
        rating: 4.5,
        reviewCount: 120,
        inStock: true,
        category: 'Ação e Aventura'
      },

      {
        id: '49',
        name: 'Kingdom Come: Deliverance',
        description: 'Chave digital de Kingdom Come: Deliverance para Steam.',
        price: 29.90,
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/379430/library_600x900_2x.jpg?t=1724938070',
        rating: 4.8,
        reviewCount: 520,
        inStock: true,
        category: 'RPG'
      },

      {
        id: '50',
        name: 'Kingdom Come: Deliverance II',
        description: 'Chave digital de Kingdom Come: Deliverance II para Steam.',
        price: 129.90,
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1771300/library_600x900_2x.jpg?t=1761038743',
        bannerUrl: 'https://cdn1.epicgames.com/spt-assets/a7641d724f1242db95f8f72fc0fd8d81/kingdom-come-deliverance-2-3b725.jpg',
        rating: 4.9,
        reviewCount: 720,
        inStock: true,
        category: 'RPG'
      },

    ] as Product[],

    category: 'Games',
    wishlistItems: [],
  } as EcommerceState),

  withComputed(({ category, products, wishlistItems }) => ({

    Categorias: computed(() => {
      const categorias = products().map(p => p.category);

      return [
        'Todos os Jogos',
        ...[...new Set(categorias)].sort()
      ];
    }),

    filteredProducts: computed(() => {

      const categoria = category().toLowerCase();

      if (categoria === 'todos' || categoria === 'games') {
        return [...products()].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }

      return products()
        .filter(
          p => p.category.toLowerCase() === categoria
        )
        .sort(
          (a, b) => a.name.localeCompare(b.name)
        );

    }),

    carouselProducts: computed(() => {
      return products().filter(
        p => p.bannerUrl
      );
    }),

    // Contador da lista de desejos
    wishlistCount: computed(() => wishlistItems().length)

  })),

  withMethods((store, toaster = inject(Toaster)) => ({

    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category });
    }),

    addtoWishlist: (product: Product) => {

  console.log('PRODUTO CLICADO:', product);
  console.log('WISHLIST ANTES:', store.wishlistItems());

  const updatedWishlistItems = produce(
    store.wishlistItems(),
    (draft) => {

      if (!draft.find(p => p.id === product.id)) {
        draft.push(product);
      }

    }
  );

  patchState(store, {
    wishlistItems: updatedWishlistItems
  });

  console.log('WISHLIST DEPOIS:', store.wishlistItems());
  console.log('QUANTIDADE:', store.wishlistItems().length);

  toaster.sucess(
    "Esse produto foi adicionado à sua Lista de Desejos."
  );
},

    removeFromWishlist: (product: Product) => {
        patchState(store, {
            wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id)
        });
        toaster.sucess("Esse produto foi removido da sua Lista de Desejos.");
    }

  }))

);