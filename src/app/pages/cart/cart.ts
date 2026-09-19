import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartStore } from '../../cart-store';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, MatButton, MatIconButton, MatIcon],
  template: `
    <div class="max-w-[1200px] mx-auto p-6 text-white space-y-6">
      <h1 class="text-3xl font-bold">Meu Carrinho</h1>

      <!-- Banner da Wishlist (Lista de Desejos) -->
      <div class="p-4 bg-gray-900 rounded-xl border border-gray-800 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <mat-icon class="!text-red-500">favorite</mat-icon>
          <div>
            <h3 class="font-bold text-white">Lista de Desejos ({{ wishlistStore.wishlistCount() }})</h3>
            <p class="text-sm text-gray-400">Você tem {{ wishlistStore.wishlistCount() }} itens salvos para depois</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <a routerLink="/wishlist" class="text-purple-400 hover:underline text-sm font-semibold">Ver Todos</a>
          @if (wishlistStore.wishlistCount() > 0) {
            <button
              mat-raised-button
              color="primary"
              class="!bg-purple-600"
              (click)="addAllFromWishlist()"
            >
              Adicionar Todos ao Carrinho
            </button>
          }
        </div>
      </div>

      @if (store.cartCount() > 0) {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Lista de Produtos do Carrinho -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center justify-between mb-2">
              <h2 class="text-xl font-bold text-gray-300">Itens do Carrinho ({{ store.cartCount() }})</h2>
              <button
                matButton
                class="!text-red-400 hover:!text-red-300 !flex !items-center !gap-1"
                (click)="store.clearCart()"
              >
                <mat-icon class="!text-red-400 !text-sm">delete_sweep</mat-icon>
                <span>Esvaziar Carrinho</span>
              </button>
            </div>

            @for (item of store.items(); track item.product.id) {
              <div class="flex items-center justify-between p-4 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
                <div class="flex items-center gap-4">
                  <img [src]="item.product.imageUrl || item.product.bannerUrl" [alt]="item.product.name" class="w-20 h-24 object-cover rounded-lg" />
                  <div>
                    <h3 class="font-bold text-lg text-white">{{ item.product.name }}</h3>
                    <p class="text-blue-400 font-semibold">{{ item.product.price | currency:'BRL' }}</p>
                  </div>
                </div>

                <!-- Controles de Quantidade -->
                <div class="flex items-center gap-3">
                  <button mat-icon-button (click)="store.updateQuantity(item.product.id, -1)">
                    <mat-icon class="!text-white">remove</mat-icon>
                  </button>
                  <span class="font-bold text-lg text-white px-2">{{ item.quantity }}</span>
                  <button mat-icon-button (click)="store.updateQuantity(item.product.id, 1)">
                    <mat-icon class="!text-white">add</mat-icon>
                  </button>
                  <button mat-icon-button (click)="store.removeFromCart(item.product.id)">
                    <mat-icon class="!text-red-500">delete</mat-icon>
                  </button>
                </div>
              </div>
            }
          </div>

          <!-- Resumo do Pedido com Impostos -->
          <div class="p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800 h-fit space-y-4">
            <h2 class="text-xl font-bold border-b border-gray-800 pb-3 text-white">Resumo da Compra</h2>
            <div class="flex justify-between text-lg text-gray-300">
              <span>Subtotal:</span>
              <span class="font-bold text-white">{{ store.subtotal() | currency:'BRL' }}</span>
            </div>
            <div class="flex justify-between text-lg text-gray-300">
              <span>Imposto (5%):</span>
              <span class="font-bold text-white">{{ store.tax() | currency:'BRL' }}</span>
            </div>
            <div class="flex justify-between text-xl font-extrabold text-green-400 border-t border-gray-800 pt-3">
              <span>Total:</span>
              <span>{{ store.total() | currency:'BRL' }}</span>
            </div>
            <button mat-raised-button color="primary" class="w-full mt-4 py-3 text-lg !bg-purple-600">
              Finalizar Compra
            </button>
          </div>
        </div>
      } @else {
        <div class="text-center py-16 space-y-4 bg-gray-900 rounded-xl border border-gray-800">
          <mat-icon class="text-6xl text-gray-500 !w-16 !h-16 !text-[64px]">shopping_cart</mat-icon>
          <h2 class="text-2xl font-bold text-gray-300">Seu carrinho está vazio</h2>
          <a routerLink="/" mat-raised-button color="primary" class="!bg-purple-600">Continuar Comprando</a>
        </div>
      }
    </div>
  `,
})
export default class Cart {
  store = inject(CartStore);
  wishlistStore = inject(EcommerceStore);

  addAllFromWishlist() {
    const items = this.wishlistStore.wishlistItems();
    if (items.length > 0) {
      this.store.addManyToCart(items);
      this.wishlistStore.clearWishlist();
    }
  }
}