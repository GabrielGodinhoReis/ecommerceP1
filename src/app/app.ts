import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';

@Component({
  imports: [RouterOutlet, Header],
  selector: 'app-root',
  styles: [],
  template: `
  
    <app-header class="z-10" />
    <div class="h-[calc(100%-64px)] overflow-auto">
      <router-outlet/>
    </div>
  `, 
})
export class App {
}