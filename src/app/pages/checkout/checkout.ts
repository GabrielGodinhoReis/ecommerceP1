import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CartStore } from '../../cart-store';
import { EcommerceStore } from '../../ecommerce-store';
import { Toaster } from '../../services/toaster';

@Component({
  selector: 'app-checkout',
  imports: [
    CurrencyPipe,
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div class="max-w-[1200px] mx-auto p-6 text-white space-y-6">
      <a routerLink="/cart" mat-button class="!text-gray-300">
        <mat-icon>arrow_back</mat-icon> Voltar ao Carrinho
      </a>

      <h1 class="text-3xl font-bold">Finalizar Compra</h1>

      <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- Informações de Envio e Pagamento (3 Colunas) -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Endereço -->
          <div class="p-6 bg-gray-900 rounded-xl border border-gray-800 space-y-4">
            <div class="flex items-center gap-2 border-b border-gray-800 pb-3">
              <mat-icon class="text-purple-400">local_shipping</mat-icon>
              <h2 class="text-xl font-bold">Endereço de Entrega</h2>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <mat-form-field appearance="outline">
                <mat-label>Nome</mat-label>
                <input matInput formControlName="firstName" placeholder="Seu nome" />
                @if (checkoutForm.get('firstName')?.invalid && checkoutForm.get('firstName')?.touched) {
                  <mat-error>Informe seu nome</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Sobrenome</mat-label>
                <input matInput formControlName="lastName" placeholder="Seu sobrenome" />
                @if (checkoutForm.get('lastName')?.invalid && checkoutForm.get('lastName')?.touched) {
                  <mat-error>Informe seu sobrenome</mat-error>
                }
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Endereço</mat-label>
              <input matInput formControlName="address" placeholder="Rua, número, complemento" />
              @if (checkoutForm.get('address')?.invalid && checkoutForm.get('address')?.touched) {
                <mat-error>Informe seu endereço completo</mat-error>
              }
            </mat-form-field>

            <div class="grid grid-cols-3 gap-4">
              <mat-form-field appearance="outline">
                <mat-label>Cidade</mat-label>
                <input matInput formControlName="city" placeholder="Sua cidade" />
                @if (checkoutForm.get('city')?.invalid && checkoutForm.get('city')?.touched) {
                  <mat-error>Cidade obrigatória</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Estado</mat-label>
                <input matInput formControlName="state" placeholder="UF" />
                @if (checkoutForm.get('state')?.invalid && checkoutForm.get('state')?.touched) {
                  <mat-error>Estado obrigatório</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>CEP</mat-label>
                <input matInput formControlName="zipCode" placeholder="00000-000" />
                @if (checkoutForm.get('zipCode')?.invalid && checkoutForm.get('zipCode')?.touched) {
                  <mat-error>CEP obrigatório</mat-error>
                }
              </mat-form-field>
            </div>
          </div>

          <!-- Pagamento -->
          <div class="p-6 bg-gray-900 rounded-xl border border-gray-800 space-y-4">
            <div class="flex items-center gap-2 border-b border-gray-800 pb-3">
              <mat-icon class="text-purple-400">payment</mat-icon>
              <h2 class="text-xl font-bold">Pagamento</h2>
            </div>

            <mat-radio-group value="stripe" class="flex flex-col gap-3">
              <mat-radio-button value="stripe" checked>
                <span class="text-white font-medium">Cartão de Crédito / Stripe</span>
              </mat-radio-button>
            </mat-radio-group>
          </div>
        </div>

        <!-- Resumo do Pedido (2 Colunas) -->
        <div class="lg:col-span-2 p-6 bg-gray-900 rounded-xl border border-gray-800 h-fit space-y-4">
          <h2 class="text-xl font-bold border-b border-gray-800 pb-3">Resumo do Pedido</h2>

          <div class="space-y-3 max-h-[250px] overflow-y-auto pr-2">
            @for (item of cartStore.items(); track item.product.id) {
              <div class="flex justify-between items-center text-sm border-b border-gray-800/50 pb-2">
                <div>
                  <p class="font-semibold text-white">{{ item.product.name }}</p>
                  <p class="text-gray-400">Qtd: {{ item.quantity }}</p>
                </div>
                <span class="font-bold text-blue-400">
                  {{ (item.product.price * item.quantity) | currency:'BRL' }}
                </span>
              </div>
            }
          </div>

          <div class="space-y-2 border-t border-gray-800 pt-3 text-gray-300">
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span class="font-bold text-white">{{ cartStore.subtotal() | currency:'BRL' }}</span>
            </div>
            <div class="flex justify-between">
              <span>Imposto (5%):</span>
              <span class="font-bold text-white">{{ cartStore.tax() | currency:'BRL' }}</span>
            </div>
            <div class="flex justify-between text-xl font-extrabold text-green-400 border-t border-gray-800 pt-3">
              <span>Total:</span>
              <span>{{ cartStore.total() | currency:'BRL' }}</span>
            </div>
          </div>

          <button
            mat-raised-button
            color="primary"
            type="submit"
            class="w-full mt-4 py-3 text-lg !bg-purple-600"
            [disabled]="ecommerceStore.loading()"
          >
            {{ ecommerceStore.loading() ? 'Processando...' : 'Confirmar e Pagar' }}
          </button>
        </div>
      </form>
    </div>
  `,
})
export default class Checkout {
  private fb = inject(FormBuilder).nonNullable;
  private toaster = inject(Toaster);
  cartStore = inject(CartStore);
  ecommerceStore = inject(EcommerceStore);

  checkoutForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
  });

  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.toaster.error('Preencha todos os campos do endereço de entrega!');
      return;
    }

    this.ecommerceStore.placeOrder();
  }
}