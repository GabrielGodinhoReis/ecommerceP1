import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  template: `
    <div
      class="w-full max-w-[400px] p-6 flex flex-col bg-gray-900 text-white rounded-xl shadow-2xl shadow-black/70"
    >
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-2xl font-bold">
            {{ isSignUp() ? 'Criar Conta' : 'Entrar' }}
          </h2>

          <p class="text-sm text-gray-400">
            {{
              isSignUp()
                ? 'Preencha seus dados para se cadastrar'
                : 'Acesse sua conta para continuar'
            }}
          </p>
        </div>

        <button mat-icon-button mat-dialog-close>
          <mat-icon class="!text-white">close</mat-icon>
        </button>
      </div>

      <form
        [formGroup]="authForm"
        (ngSubmit)="onSubmit()"
        class="flex flex-col gap-3 mt-2"
      >
        @if (isSignUp()) {
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Nome Completo</mat-label>

            <input
              matInput
              formControlName="name"
              placeholder="Seu nome"
            />

            <mat-icon matPrefix class="mr-2 text-gray-400">
              person
            </mat-icon>
          </mat-form-field>
        }

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>E-mail</mat-label>

          <input
            matInput
            formControlName="email"
            type="email"
            placeholder="seu@email.com"
          />

          <mat-icon matPrefix class="mr-2 text-gray-400">
            email
          </mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Senha</mat-label>

          <input
            matInput
            formControlName="password"
            [type]="passwordVisible() ? 'text' : 'password'"
          />

          <mat-icon matPrefix class="mr-2 text-gray-400">
            lock
          </mat-icon>

          <button
            type="button"
            mat-icon-button
            matSuffix
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon class="!text-gray-400">
              {{ passwordVisible() ? 'visibility_off' : 'visibility' }}
            </mat-icon>
          </button>
        </mat-form-field>

        @if (isSignUp()) {
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Confirmar Senha</mat-label>

            <input
              matInput
              formControlName="confirmPassword"
              [type]="passwordVisible() ? 'text' : 'password'"
            />

            <mat-icon matPrefix class="mr-2 text-gray-400">
              lock
            </mat-icon>
          </mat-form-field>
        }

        <button
          type="submit"
          class="w-full mt-2 py-3 rounded-lg border-0 outline-none bg-[#8b5cf6] text-white font-semibold shadow-lg shadow-purple-900/40 transition hover:bg-purple-700 hover:shadow-purple-900/60 active:scale-[0.98]"
        >
          {{ isSignUp() ? 'Cadastrar' : 'Entrar' }}
        </button>
      </form>

      <div class="mt-4 text-center text-sm text-gray-400">
        @if (isSignUp()) {
          Já tem uma conta?

          <button
            type="button"
            (click)="toggleMode()"
            class="text-purple-400 font-bold hover:underline bg-transparent border-0 cursor-pointer"
          >
            Fazer Login
          </button>
        } @else {
          Não tem uma conta?

          <button
            type="button"
            (click)="toggleMode()"
            class="text-purple-400 font-bold hover:underline bg-transparent border-0 cursor-pointer"
          >
            Cadastre-se
          </button>
        }
      </div>
    </div>
  `,
})
export default class SignInDialog {
  private fb = inject(FormBuilder).nonNullable;
  private store = inject(EcommerceStore);
  private dialogRef = inject(MatDialogRef<SignInDialog>);

  data = inject<{
    checkout?: boolean;
    mode?: 'signin' | 'signup';
  }>(MAT_DIALOG_DATA, { optional: true });

  isSignUp = signal<boolean>(this.data?.mode === 'signup');

  passwordVisible = signal(false);

  authForm = this.fb.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirmPassword: [''],
  });

  toggleMode() {
    this.isSignUp.set(!this.isSignUp());
    this.authForm.reset();
  }

  onSubmit() {
    if (this.isSignUp()) {
      const val = this.authForm.getRawValue();

      if (!val.name) {
        alert('Por favor, informe seu nome!');
        return;
      }

      if (val.password !== val.confirmPassword) {
        alert('As senhas não coincidem!');
        return;
      }

      if (this.authForm.get('email')?.valid && val.password) {
        this.store.signUp({
          name: val.name,
          email: val.email,
          password: val.password,
          checkout: this.data?.checkout,
          dialogId: this.dialogRef.id,
        });
      }
    } else {
      const val = this.authForm.getRawValue();

      if (this.authForm.get('email')?.valid && val.password) {
        this.store.signIn({
          email: val.email,
          password: val.password,
          checkout: this.data?.checkout,
          dialogId: this.dialogRef.id,
        });
      }
    }
  }
}