import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [CurrencyPipe, MatAnchor, MatIcon, MatButton],
  selector: 'app-product-card',
  styles: ``,
  template: ` 
  
    <div class="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
        
        <img [src]="product().imageUrl" class="w-full aspect-[2/3] object-cover rounded-xl"/>

        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
            {{ product().name }}
          </h3>
          <p class="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
            {{ product().description }}
          </p>

          <!-- add rating component -->

          <div class="text-sm font-medium mb-4">
            {{ product().inStock ? 'Em Estoque' : 'Fora de Estoque' }}
          </div>

          <div class="flex items-center justify-between mt-auto">
            <span class="text-2x1 font-bold text-gray-900"> \ {{ product().price | currency:'BRL':'symbol':'1.2-2' }} </span>
            <button matButton="filled" class="flex items-center gap-2" (click)="addToCartClicked.emit(product())">
              <mat-icon>shopping_cart</mat-icon>
              Adicionar ao Carrinho
            </button>
          </div>

        </div>

      </div>
  
  `,
})
export class ProductCard {

  product = input.required<Product>();

  addToCartClicked = output<Product>();

}
