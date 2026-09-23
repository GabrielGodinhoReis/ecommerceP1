import { Component, inject } from '@angular/core';

import { CurrencyPipe } from '@angular/common';

import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { MatRadioModule } from '@angular/material/radio';

import { CartStore } from '../../cart-store';

import { EcommerceStore } from '../../ecommerce-store';

import { Toaster } from '../../services/toaster';

@Component({
  selector: 'app-checkout',

  imports: [CurrencyPipe, RouterLink, MatButtonModule, MatIconModule, MatRadioModule],

  template: `
    <div class="max-w-[1200px] mx-auto p-4 sm:p-6 pb-24 text-white space-y-5 sm:space-y-6">
      <!-- Voltar para o carrinho -->
      <a routerLink="/cart" mat-button class="!text-gray-300">
        <mat-icon>arrow_back</mat-icon>
        Voltar ao Carrinho
      </a>

      <!-- Título -->
      <h1 class="text-2xl sm:text-3xl font-bold">Finalizar Compra</h1>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
        <!-- Métodos de pagamento -->
        <div class="lg:col-span-3">
          <div
            class="p-4 sm:p-6 bg-gray-900 rounded-xl border border-gray-800 space-y-5 sm:space-y-6"
          >
            <!-- Título da seção -->
            <div class="flex items-center gap-2 border-b border-gray-800 pb-3">
              <mat-icon class="text-purple-400"> payment </mat-icon>

              <h2 class="text-lg sm:text-xl font-bold">Método de Pagamento</h2>
            </div>

            <!-- Opções de pagamento -->
            <mat-radio-group
              [value]="paymentMethod"
              (change)="paymentMethod = $event.value"
              class="flex flex-col gap-3 sm:gap-4"
            >
              <!-- Cartão de crédito -->
              <div
                class="p-3 sm:p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition"
              >
                <mat-radio-button value="credit">
                  <div class="flex items-center gap-3">
                    <mat-icon class="text-purple-400"> credit_card </mat-icon>

                    <div>
                      <p class="font-bold text-white">Cartão de Crédito</p>

                      <p class="text-sm text-gray-400">Pague com seu cartão de crédito</p>
                    </div>
                  </div>
                </mat-radio-button>
              </div>

              <!-- Cartão de débito -->
              <div
                class="p-3 sm:p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition"
              >
                <mat-radio-button value="debit">
                  <div class="flex items-center gap-3">
                    <mat-icon class="text-blue-400"> credit_card </mat-icon>

                    <div>
                      <p class="font-bold text-white">Cartão de Débito</p>

                      <p class="text-sm text-gray-400">
                        Pague diretamente com seu cartão de débito
                      </p>
                    </div>
                  </div>
                </mat-radio-button>
              </div>

              <!-- Pix -->
              <div
                class="p-3 sm:p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition"
              >
                <mat-radio-button value="pix">
                  <div class="flex items-center gap-3">
                    <mat-icon class="text-green-400"> account_balance </mat-icon>

                    <div>
                      <p class="font-bold text-white">Pix</p>

                      <p class="text-sm text-gray-400">Pagamento instantâneo via Pix</p>
                    </div>
                  </div>
                </mat-radio-button>
              </div>

              <!-- PayPal -->
              <div
                class="p-3 sm:p-4 border border-gray-700 rounded-lg hover:border-purple-500 transition"
              >
                <mat-radio-button value="paypal">
                  <div class="flex items-center gap-3">
                    <mat-icon class="text-blue-400"> account_balance_wallet </mat-icon>

                    <div>
                      <p class="font-bold text-white">PayPal</p>

                      <p class="text-sm text-gray-400">Pague usando sua conta PayPal</p>
                    </div>
                  </div>
                </mat-radio-button>
              </div>
            </mat-radio-group>
          </div>
        </div>

        <!-- Resumo do pedido -->
        <div
          class="lg:col-span-2 p-4 sm:p-6 bg-gray-900 rounded-xl border border-gray-800 h-fit space-y-4"
        >
          <h2 class="text-lg sm:text-xl font-bold border-b border-gray-800 pb-3">
            Resumo do Pedido
          </h2>

          <!-- Produtos -->
          <div class="space-y-3 max-h-[250px] overflow-y-auto pr-2">
            @for (item of cartStore.items(); track item.product.id) {
              <div
                class="flex justify-between items-center gap-3 text-sm border-b border-gray-800/50 pb-2"
              >
                <div class="min-w-0">
                  <p class="font-semibold text-white truncate">
                    {{ item.product.name }}
                  </p>

                  <p class="text-gray-400">Qtd: {{ item.quantity }}</p>
                </div>

                <span class="font-bold text-blue-400 whitespace-nowrap">
                  {{ item.product.price * item.quantity | currency: 'BRL' }}
                </span>
              </div>
            }
          </div>

          <!-- Valores -->
          <div class="space-y-2 border-t border-gray-800 pt-3 text-gray-300">
            <!-- Total -->
            <div
              class="flex justify-between gap-3 text-lg sm:text-xl font-extrabold text-green-400 border-t border-gray-800 pt-3"
            >
              <span> Total: </span>

              <span class="whitespace-nowrap">
                {{ cartStore.subtotal() | currency: 'BRL' }}
              </span>
            </div>
          </div>

          <!-- Confirmar pagamento -->
          <button
            matButton
            type="button"
            class="w-full mt-4 !bg-gray-700 !text-white !flex !items-center !justify-center !rounded-xl !px-5 !py-3 !text-lg font-medium shadow-sm transition-all duration-200 hover:!bg-[#8b5cf6]"
            (click)="onSubmit()"
          >
            <span class="!flex !items-center !justify-center !w-full !leading-none">
              Confirmar e Pagar
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class Checkout {
  private toaster = inject(Toaster);

  cartStore = inject(CartStore);

  ecommerceStore = inject(EcommerceStore);

  paymentMethod = 'credit';

  onSubmit() {
    if (!this.paymentMethod) {
      this.toaster.error('Selecione um método de pagamento!');

      return;
    }

    this.ecommerceStore.placeOrder();
  }
}
