import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

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

  
}
