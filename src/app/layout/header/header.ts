import { Component } from '@angular/core';
import { MatToolbar} from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';

@Component({
  imports: [MatToolbar, HeaderActions],
  selector: 'app-header',
  styles: ``,
  template: ` 
    <mat-toolbar class="w-full elevated py-2"> 
      
      <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <span class="gaming-title">
          Gaming
        <span class="hub-badge">Hub</span>
      </span>

      <app-header-actions />
    </div>

    </mat-toolbar>
  `,
})
export class Header {}
