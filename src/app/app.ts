import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';

import { Header } from './layout/header/header';

@Component({
  imports: [RouterOutlet, RouterLink, Header],
  selector: 'app-root',
  styles: `
    :host {
      display: block;
      min-height: 100vh;
    }

    .content {
      padding-top: 60px;
      min-height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
      box-sizing: border-box;

      display: flex;
      flex-direction: column;
    }

    .page-content {
      flex: 1;
    }

    @media (max-width: 1000px) {
      .content {
        padding-top: 90px;
      }
    }
  `,
  template: `
    <app-header />

    <div class="content">
      <div class="page-content">
        <router-outlet />
      </div>

      <footer
        class="
          border-t
          border-gray-800
          bg-[#15171e]
          text-white
          shrink-0
        "
      >
        <div
          class="
            mx-auto
            max-w-[1200px]
            px-6
            py-8
          "
        >
          <div
            class="
              flex
              flex-col
              gap-8
              md:flex-row
              md:items-start
              md:justify-between
            "
          >
            <!-- MARCA -->
            <div class="max-w-sm">
              <h2 class="text-xl font-bold">
                Gaming
                <span class="text-[#8b5cf6]">
                  Hub
                </span>
              </h2>

              <p class="mt-2 text-sm leading-relaxed text-gray-400">
                Sua loja digital de jogos.
                Encontre seus próximos jogos favoritos.
              </p>
            </div>

            <!-- NAVEGAÇÃO -->
            <div>
              <h3 class="mb-3 text-sm font-semibold text-white">
                Navegação
              </h3>

              <div class="flex flex-col gap-2 text-sm text-gray-400">
                <a
                  routerLink="/products/Games"
                  class="transition-colors hover:text-[#8b5cf6]"
                >
                  Jogos
                </a>

                <a
                  routerLink="/wishlist"
                  class="transition-colors hover:text-[#8b5cf6]"
                >
                  Lista de Desejos
                </a>

                <a
                  routerLink="/cart"
                  class="transition-colors hover:text-[#8b5cf6]"
                >
                  Carrinho
                </a>
              </div>
            </div>

            <!-- INFORMAÇÕES -->
            <div>
              <h3 class="mb-3 text-sm font-semibold text-white">
                Gaming Hub
              </h3>

              <div class="flex flex-col gap-2 text-sm text-gray-400">
                <span>Entrega digital</span>
                <span>Compra segura</span>
                <span>Suporte ao cliente</span>
              </div>
            </div>
          </div>

          <!-- COPYRIGHT -->
          <div
            class="
              mt-8
              border-t
              border-gray-800
              pt-5
              text-center
              text-xs
              text-gray-500
            "
          >
            © 2026 Gaming Hub. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class App {}