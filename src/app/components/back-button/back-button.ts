import { Component, input } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatAnchor, RouterLink, MatIcon],
  selector: 'app-back-button',
  styles: `
  :host{
    display: block;
  }
  `,
  template: ` 

  <button
  matButton="filled"
  [routerLink]="navigateTo() ?? null"
  class="-ms-2 flex items-center gap-2 rounded-xl !bg-gray-700 !px-4 !py-2 !text-sm !font-medium !text-gray-100 shadow-sm transition-all duration-200 hover:!bg-[#8b5cf6] hover:!shadow-md active:scale-95"
  >
  <mat-icon mat-icon class="!text-[20px]">arrow_back</mat-icon>
  <ng-content />
  </button>

  `,
})
export class BackButton {
  label = input('');
  navigateTo = input<string>();
}
