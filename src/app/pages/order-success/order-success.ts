import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-success',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="max-w-[600px] mx-auto p-8 text-center text-white space-y-6 bg-gray-900 rounded-xl my-12">
      <div class="flex justify-center">
        <mat-icon class="!text-green-400 !w-20 !h-20 !text-[80px]">check_circle</mat-icon>
      </div>

      <h1 class="text-3xl font-bold">Pedido Confirmado!</h1>

      <p class="text-gray-300">
        Obrigado pela sua compra! Os detalhes do pedido e as chaves de ativação foram enviados para o seu e-mail.
      </p>

      <a
        routerLink="/"
        mat-raised-button
        class="!bg-purple-600 hover:!bg-purple-700 !text-white !font-bold !px-6 !py-3 !rounded-xl"
      >
        Voltar à Loja
      </a>
    </div>
  `,
})
export default class OrderSuccess {}