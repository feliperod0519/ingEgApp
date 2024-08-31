import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});
  lastError: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.lastError = '';
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  loginUser(){
    if(this.loginForm.invalid)
      return;
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
                            return credenciales?.user?.email 
                          }),
      catchError(err => { 
                          console.error('hello'); 
                          this.lastError = err;
                          return err; 
                        })
    ).subscribe(email => {
                            console.log(email);
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
                        }
                );
  }
}
