import { inject, Injectable } from '@angular/core';

import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class Toaster {

  toaster = inject(HotToastService);

  sucess(message: string) {
    this.toaster.success(message, {
      style: {
        whiteSpace: 'nowrap',
        minWidth: '450px',
        maxWidth: 'none'
      }
    });
  }

  error(message: string) {
    this.toaster.error(message, {
      style: {
        whiteSpace: 'nowrap',
        minWidth: '450px',
        maxWidth: 'none'
      }
    });
  }

}
