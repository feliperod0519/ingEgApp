import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as uiActions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private router: Router, 
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  crearUsuario() {
    if(this.registroForm.invalid)
      return;
    this.store.dispatch(uiActions.stopLoading());
    const { nombre, email, password } = this.registroForm.value;
    Swal.fire({
      title: 'Validando...',
      didOpen: () => {
         Swal.showLoading()
      }
    });
    this.authService.crearUsuario({ nombre, 
                                    email, 
                                    password}).then(credenciales => {
                                      console.log(credenciales);
                                      Swal.close();
                                      this.store.dispatch(uiActions.stopLoading());
                                      this.router.navigate(['/']);
                                    }).catch(err=>{
                                      Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: err.message,
                                        footer: '<a href>Why do I have this issue?</a>'
                                  });
                                    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  
}
