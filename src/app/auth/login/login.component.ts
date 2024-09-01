import { Component,OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, map, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm: FormGroup = new FormGroup({});
  lastError: string = '';
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.lastError = '';
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
    this.uiSubscription = this.store.select('ui').subscribe(ui => { 
      console.log('Cargando estado de la UI');
      this.loading = ui.isLoading; 
    });
  }

  loginUser(){
    if(this.loginForm.invalid)
      return;
    this.store.dispatch(uiActions.startLoading());
    Swal.fire({
      title: 'Validando...',
      didOpen: () => {
         Swal.showLoading()
      }
    });
    const { email, password } = this.loginForm.value;
    this.authService.loginUser({ email, password}).pipe(
      map(credenciales => { 
                            this.lastError = '';
                            console.log('credenciales',credenciales?.user?.email);
                            return credenciales?.user?.email 
                          }),
      catchError(err => { 
                          this.lastError = err;
                          return err; 
                        })
    ).subscribe(email => {
                            console.log('hello', email);
                            this.router.navigate(['/']);
                            Swal.close();
                          } , 
                err => {
                          Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: this.lastError,
                                footer: '<a href>Why do I have this issue?</a>'
                          });
                          this.store.dispatch(uiActions.stopLoading());
                        }
                );
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
