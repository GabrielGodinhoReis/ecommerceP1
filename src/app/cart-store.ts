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
      store.items().reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0)
    );
    const tax = computed(() => Math.round(0.05 * subtotal()));
    const total = computed(() => subtotal() + tax());

    return {
      subtotal,
      tax,
      total,
      cartCount: computed(() =>
        store.items().reduce((acc, item) => acc + item.quantity, 0)
      ),
    };
  }),
  withMethods((store) => {
    const toaster = inject(Toaster);

    return {
      addToCart(product: any) {
        const currentItems = store.items();
        const existingIndex = currentItems.findIndex((i) => i.product.id === product.id);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          patchState(store, { items: updated });
          toaster.sucess('Quantidade atualizada no carrinho!');
        } else {
          patchState(store, {
            items: [...currentItems, { product, quantity: 1 }],
          });
          toaster.sucess('Produto adicionado ao carrinho!');
        }
      },
      addManyToCart(products: any[]) {
        if (!products.length) return;
        let currentItems = [...store.items()];

        products.forEach((product) => {
          const existingIndex = currentItems.findIndex((i) => i.product.id === product.id);
          if (existingIndex > -1) {
            currentItems[existingIndex] = {
              ...currentItems[existingIndex],
              quantity: currentItems[existingIndex].quantity + 1,
            };
          } else {
            currentItems.push({ product, quantity: 1 });
          }
        });

        patchState(store, { items: currentItems });
        toaster.sucess('Itens da lista de desejos adicionados ao carrinho!');
      },
      updateQuantity(productId: number, delta: number) {
        const updated = store
          .items()
          .map((item) => {
            if (item.product.id === productId) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[];

        patchState(store, { items: updated });
      },
      removeFromCart(productId: number) {
        const updated = store.items().filter((i) => i.product.id !== productId);
        patchState(store, { items: updated });
        toaster.error('Produto removido do carrinho!');
      },
      clearCart() {
        patchState(store, { items: [] });
      },
    };
  })
);