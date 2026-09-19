import { Component } from '@angular/core';

import { MatToolbar } from '@angular/material/toolbar';

import { HeaderActions } from '../header-actions/header-actions';

import { RouterLink } from '@angular/router';

@Component({

  imports: [
    MatToolbar,
    HeaderActions,
    RouterLink
  ],

  selector: 'app-header',

  styles: ``,

  template: ` 

    <mat-toolbar class="w-full elevated py-2"> 

      <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between">

        <a
          routerLink="/"
          class="no-underline cursor-pointer"
        >

          <span class="gaming-title">

            Gaming
            <span class="hub-badge">Hub</span>

          </span>

        </a>

        <app-header-actions />

      </div>

    </mat-toolbar>

  `,

})

export class Header {}