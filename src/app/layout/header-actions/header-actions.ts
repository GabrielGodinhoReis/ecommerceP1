import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatButton, MatIconButton, MatIcon, RouterLink],
  selector: 'app-header-actions',
  styles: ``,
  template: ` 
    <div class="flex items-center gap-2">
      <button matIconButton routerLink="/wishlist">
        <mat-icon>favorite</mat-icon>
      </button>
      <button matIconButton>
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button matButton>Entrar</button>
      <button matButton="filled">Cadastrar</button>
    </div>
  `,
})
export class HeaderActions {}
