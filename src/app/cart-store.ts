import { computed, inject } from '@angular/core';

import { signalStore, withComputed, withMethods, withState, patchState } from '@ngrx/signals';

import { Toaster } from './services/toaster';

export interface CartItem {
  product: any;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const CartStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed((store) => {
    const subtotal = computed(() =>
      store.items().reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0),
    );

    const tax = computed(() => Math.round(0.05 * subtotal()));

    const total = computed(() => subtotal() + tax());

    return {
      subtotal,
      tax,
      total,

      cartCount: computed(() => store.items().reduce((acc, item) => acc + item.quantity, 0)),
    };
  }),

  withMethods((store) => {
    const toaster = inject(Toaster);

    return {
      addToCart(product: any, quantity: number = 1) {
        // Não permite adicionar jogo fora de estoque
        if (!product.inStock) {
          toaster.error('Este jogo está fora de estoque!');
          return;
        }

        const currentItems = store.items();

        const existingIndex = currentItems.findIndex((i) => i.product.id === product.id);

        if (existingIndex > -1) {
          const updated = [...currentItems];

          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };

          patchState(store, {
            items: updated,
          });

          toaster.sucess('Quantidade atualizada no carrinho!');
        } else {
          patchState(store, {
            items: [
              ...currentItems,
              {
                product,
                quantity,
              },
            ],
          });

          toaster.sucess('Jogo adicionado ao carrinho!');
        }
      },

      addManyToCart(products: any[]) {
        if (!products.length) {
          return [];
        }

        // Pega somente os jogos que estão disponíveis
        const availableProducts = products.filter((product) => product.inStock);

        // Nenhum jogo disponível
        if (!availableProducts.length) {
          toaster.error('Nenhum jogo disponível em estoque!');

          return [];
        }

        let currentItems = [...store.items()];

        availableProducts.forEach((product) => {
          const existingIndex = currentItems.findIndex((i) => i.product.id === product.id);

          if (existingIndex > -1) {
            currentItems[existingIndex] = {
              ...currentItems[existingIndex],
              quantity: currentItems[existingIndex].quantity + 1,
            };
          } else {
            currentItems.push({
              product,
              quantity: 1,
            });
          }
        });

        patchState(store, {
          items: currentItems,
        });

        toaster.sucess('Jogos da lista de desejos adicionados ao Carrinho!');

        // Retorna SOMENTE os que realmente foram adicionados
        return availableProducts;
      },

      updateQuantity(productId: number, delta: number) {
        const currentItem = store.items().find((item) => item.product.id === productId);

        if (!currentItem) return;

        if (delta < 0 && currentItem.quantity === 1) {
          return;
        }

        const updated = store.items().map((item) => {
          if (item.product.id === productId) {
            return {
              ...item,
              quantity: item.quantity + delta,
            };
          }

          return item;
        });

        patchState(store, {
          items: updated,
        });

        if (delta > 0) {
          toaster.sucess('Quantidade aumentada no carrinho!');
        } else {
          toaster.error('Quantidade diminuída no carrinho!');
        }
      },

      removeFromCart(productId: number) {
        const updated = store.items().filter((i) => i.product.id !== productId);

        patchState(store, {
          items: updated,
        });

        toaster.error('Jogo removido do carrinho!');
      },

      clearCart() {
        patchState(store, {
          items: [],
        });

        toaster.error('Todos os Jogos foram Removidos do carrinho!');
      },
    };
  }),
);
