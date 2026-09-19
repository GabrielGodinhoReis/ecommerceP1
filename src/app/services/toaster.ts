import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class Toaster {

  toaster = inject(HotToastService);

  sucess(message: string) {
    this.toaster.success(message, {
      duration: 3500,
      style: {
        whiteSpace: 'nowrap',
        minWidth: '450px',
        maxWidth: 'none',
        background: '#374151',
        color: '#ffffff',
        border: '1px solid #26db26'
      }
    });
  }

  error(message: string) {
    this.toaster.error(message, {
      duration: 3500,
      style: {
        whiteSpace: 'nowrap',
        minWidth: '450px',
        maxWidth: 'none',
        background: '#374151',
        color: '#ffffff',
        border: '1px solid #dc2626'
      }
    });
  }
}