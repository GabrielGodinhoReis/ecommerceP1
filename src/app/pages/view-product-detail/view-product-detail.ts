import { Component, computed, effect, inject, input } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { BackButton } from '../../components/back-button/back-button';
import { ProductInfo } from './product-info/product-info';

@Component({
  imports: [BackButton, ProductInfo],
  selector: 'app-view-product-detail',
  styles: ``,
  template: `
    <div class="mx-auto max-w-[1200px] py-6">

      <app-back-button class="mb-6" [navigateTo]="backRoute()">Continue Comprando</app-back-button>
      @if (store.selectedProduct(); as product) {
        <div class="flex gap-8 mb-8">
          
          <img [src]="product.imageUrl" class="w-[500px] h-[700px] object-cover rounded-lg" [style.view-transition-name]="'product-image-' + product.id" />
          
            <div class="flex-1">
              <app-product-info [product]="product" />
            </div>

        </div>
      }

    </div>
  `,
})
export default class ViewProductDetail {

  productId = input.required<string>();

  store = inject(EcommerceStore);

  constructor() {
    effect(() => {
      this.store.setProductId(this.productId());
    });
  }

  backRoute = computed(() => `/products/${this.store.category()}`);
}