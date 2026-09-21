import { computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { produce } from 'immer';

import { Product } from "./models/product";
import { User, SignInParams, SignUpParams } from "./models/user";
import { CartStore } from "./cart-store";
import { Toaster } from "./services/toaster";

// --- FIX PARA SSR (NODE.JS) ---
if (typeof globalThis.localStorage === 'undefined') {
  const mockStorage = new Map<string, string>();
  (globalThis as any).localStorage = {
    getItem: (key: string) => mockStorage.get(key) ?? null,
    setItem: (key: string, value: string) => mockStorage.set(key, value),
    removeItem: (key: string) => mockStorage.delete(key),
    clear: () => mockStorage.clear(),
    get length() { return mockStorage.size; },
    key: (index: number) => Array.from(mockStorage.keys())[index] ?? null,
  };
}

export type RegisteredUser = {
  name: string;
  email: string;
  password?: string;
};

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  user: User | undefined;
  registeredUsers: RegisteredUser[];
  loading: boolean;
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/4260840/b0056b5de9974b7cb60ca7b73590567fdd182572/library_capsule_2x.jpg?t=1784822692',
        bannerUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/4260840/3e40b76faf9a3eafb4397dd51308eb2e48ac3660/header_2x.jpg?t=1784822692',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3669870/546c980a0bdf9a7e1efef7b237f9c32946d73792/library_capsule_2x.jpg?t=1765198498',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/883710/library_600x900_2x.jpg?t=1671156445',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900_2x.jpg?t=1748630517',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1091500/fc7064f4a8ee2960eb51f5872d7990d771f26d2e/library_600x900_2x.jpg?t=1753355535',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900_2x.jpg?t=1671484934',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900_2x.jpg?t=1750949005',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2124490/library_600x900_2x.jpg?t=1744248659',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/292030/fe26986a2bd1601004ef0e4e1dfadd02948e3897/library_600x900_2x.jpg?t=1755527653',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3240220/394239e5da54fed177bd0ab04590812f6add1bb5/library_600x900_2x.jpg?t=1753974917',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2050650/library_600x900_2x.jpg?t=1736295896',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1850570/library_600x900_2x.jpg?t=1750697255',
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
        imageUrl: 'https://cdn2.steamgriddb.com/grid/a8f1d3b1cb35d3163c9cc2d0adff2d8f.jpg',
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
        price: 199.90,
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3764200/bde37e52add84267aeaf70c9f32d72381684d928/library_600x900_2x.jpg?t=1753863759',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/601150/library_600x900_2x.jpg?t=1671156456',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3768760/1159a696d257cbeb3f4479be3466cfba2ae938a0/library_600x900_2x.jpg?t=1763663780',
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
        price: 149.90,
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/3321460/0ea942465fd1dff8a7fbc11cc9fca8c476c5e5ae/library_capsule_2x.jpg?t=1763622767',
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
        imageUrl: 'https://cdn2.steamgriddb.com/grid/d669de0c87e54ee486d3c07e18c53950.png',
        rating: 4.7,
        reviewCount: 75,
        inStock: true,
        category: 'RPG'
      },
      {
        id: '19',
        name: 'Onimusha: Way of the Sword',
        description: 'Chave digital de Onimusha: Way of the Sword para Steam.',
        price: 189.90,
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2638890/3004939d18a7439e4d9b9e626a8c20fbf6457273/library_600x900_2x.jpg?t=1755662593',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/570940/library_600x900_2x.jpg?t=1700659130',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/335300/library_600x900_2x.jpg?t=1700660676',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/374320/library_600x900_2x.jpg?t=1748630771',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1627720/library_600x900_2x.jpg?t=1754552636',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/814380/library_600x900_2x.jpg?t=1754933980',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2322010/library_600x900_2x.jpg?t=1750909443',
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
        imageUrl: 'https://cdn2.steamgriddb.com/grid/c2ca23c951caaa036189141224933bb8.png',
        bannerUrl: 'https://cdn2.steamgriddb.com/grid/ef18421692d4ad39bf99ecd360bc5f52.jpg',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1086940/library_600x900_2x.jpg?t=1748345785',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1903340/8b21381a43ac5a535a838f723815f8fe14ceaf7c/library_600x900_2x.jpg?t=1753344054',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/632470/library_600x900_2x.jpg?t=1715250191',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/35140/library_600x900_2x.jpg?t=1745966717',
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
        imageUrl: 'https://cdn2.steamgriddb.com/grid/cad358ec6af02fdb2a98629f7097b6d5.png',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/208650/library_600x900_2x.jpg?t=1745534357',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1145360/library_600x900_2x.jpg?t=1757950399',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1145350/2ba105370a00877459144db0dd68af5f2d338429/library_capsule_2x.jpg?t=1758926015',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900_2x.jpg?t=1695270300',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1030300/93637c34351160eaa7d7ff0cce69cb4312abb819/library_capsule_2x.jpg?t=1756269003',
        bannerUrl: 'https://cdn2.steamgriddb.com/grid/78aa542a41dc2a22558c752808b08898.jpg',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/2379780/library_600x900_2x.jpg?t=1758034949',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/268910/library_600x900_2x.jpg?t=1709068320',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1547000/library_600x900_2x.jpg?t=1671134641',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1546990/library_600x900_2x.jpg?t=1671136150',
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
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/1546970/library_600x900_2x.jpg?t=1674151716',
        rating: 4.8,
        reviewCount: 760,
        inStock: true,
        category: 'Mundo Aberto'
      },
      {
        id: '42',
        name: 'Grand Theft Auto IV',
        description: 'Chave digital de Grand Theft Auto IV para Steam.',
        price: 19.90,
        imageUrl: 'https://shared.steamstatic.com/store_item_assets/steam/apps/12210/library_600x900_2x.jpg?t=1584660024',
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
        imageUrl: 'https://cdn2.steamgriddb.com/grid/f25f7b9e7ee973a3720e1261cf3a30c8.png',
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
        imageUrl: 'https://cdn2.steamgriddb.com/grid/a7147fd59ab64d16e49e819733ad2187.png',
        bannerUrl: 'https://cdn2.steamgriddb.com/grid/c65bec0cd76136436ffade5f23ee728a.jpg',
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
        imageUrl: 'https://cdn2.steamgriddb.com/grid/2c9211d82e81b0caeebd6db9155f9996.png',
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
    wishlistItems: [] as Product[],
    user: undefined as User | undefined,
    registeredUsers: [] as RegisteredUser[],
    loading: false,
  } as EcommerceState),

  withStorageSync({
    key: 'modern-store',
    select: ({ wishlistItems, user, registeredUsers }) => ({ wishlistItems, user, registeredUsers }),
  }),

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

    wishlistCount: computed(() => wishlistItems().length)
  })),

  withMethods((store) => {
    const router = inject(Router);
    const dialog = inject(MatDialog);
    const cartStore = inject(CartStore);
    const toaster = inject(Toaster);

    return {
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),

      addtoWishlist: (product: Product) => {
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

        toaster.sucess(
          "Esse Jogo foi Adicionado à sua Lista de Desejos!"
        );
      },

      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id)
        });
        toaster.error("Esse Jogo foi Removido da sua Lista de Desejos!");
      },

      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
        toaster.error('Todos os Jogos foram Removidos da Lista de Desejos!');
      },

      signIn(params: SignInParams): boolean {
        const emailInput = params.email.trim().toLowerCase();
        const found = store.registeredUsers().find(
          u => u.email.toLowerCase() === emailInput
        );

        if (!found) {
          toaster.error('E-mail não cadastrado! Clique em Cadastrar para criar sua conta.');
          return false;
        }

        if (found.password && params.password && found.password !== params.password) {
          toaster.error('Senha incorreta! Verifique os dados digitados.');
          return false;
        }

        const user: User = {
          id: found.email,
          name: found.name,
          email: found.email,
        };

        patchState(store, { user });
        toaster.sucess(`Bem-vindo(a) de volta, ${found.name}!`);

        if (params.dialogId) {
          const dialogRef = dialog.getDialogById(params.dialogId);
          dialogRef?.close();
        }

        if (params.checkout) {
          router.navigate(['/checkout']);
        }
        return true;
      },

      signUp(params: SignUpParams): boolean {
        const emailInput = params.email.trim().toLowerCase();
        const exists = store.registeredUsers().some(
          u => u.email.toLowerCase() === emailInput
        );

        if (exists) {
          toaster.error('Este e-mail já está cadastrado! Faça login.');
          return false;
        }

        const newUser: RegisteredUser = {
          name: params.name,
          email: emailInput,
          password: params.password,
        };

        const updatedUsers = [...store.registeredUsers(), newUser];

        const user: User = {
          id: newUser.email,
          name: newUser.name,
          email: newUser.email,
        };

        patchState(store, {
          registeredUsers: updatedUsers,
          user: user
        });

        toaster.sucess('Conta criada com sucesso!');

        if (params.dialogId) {
          const dialogRef = dialog.getDialogById(params.dialogId);
          dialogRef?.close();
        }

        if (params.checkout) {
          router.navigate(['/checkout']);
        }
        return true;
      },

      signOut() {
        patchState(store, { user: undefined });
        toaster.sucess('Sessão encerrada!');
      },

      async proceedToCheckout() {
        if (!store.user()) {
          const { default: SignInDialog } = await import('./components/sign-in-dialog/sign-in-dialog');
          dialog.open(SignInDialog, {
            disableClose: true,
            data: { checkout: true, mode: 'signin' },
          });
        } else {
          router.navigate(['/checkout']);
        }
      },

      async placeOrder() {
        if (!store.user()) {
          toaster.error('Faça login antes de finalizar o pedido!');
          return;
        }

        patchState(store, { loading: true });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        cartStore.clearCart();
        patchState(store, { loading: false });
        router.navigate(['/order-success']);
      },
    };
  })
);