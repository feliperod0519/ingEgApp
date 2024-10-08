import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router, private auth: AuthService) { 
  }

  ngOnInit(): void {
    if (!this.auth.isAuthenticated) {
      console.log('No autenticado');
      this.router.navigate(['/login']);
    }
  }

  
}
