import { inject, Injectable } from '@angular/core';

import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class Toaster {
  toaster = inject(HotToastService);

  private getToastStyle(borderColor: string) {
    const isMobile =
      typeof window !== 'undefined' &&
      window.innerWidth <= 600;

    return {
      whiteSpace: isMobile ? 'normal' : 'nowrap',
      minWidth: isMobile ? '0' : '450px',
      maxWidth: isMobile ? 'calc(100vw - 32px)' : 'none',
      background: '#374151',
      color: '#ffffff',
      border: `1px solid ${borderColor}`,
      fontSize: isMobile ? '13px' : '14px',
      padding: isMobile ? '10px 12px' : '12px 16px'
    };
  }

  sucess(message: string) {
    this.toaster.success(message, {
      duration: 3500,
      style: this.getToastStyle('#26db26')
    });
  }

  error(message: string) {
    this.toaster.error(message, {
      duration: 3500,
      style: this.getToastStyle('#dc2626')
    });
  }
}