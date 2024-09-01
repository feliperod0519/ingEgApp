import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as uiActions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {

  uiSubscription: Subscription = new Subscription();
  
  constructor(private router:Router, private auth: AuthService, private store: Store<AppState>) { }

  signOut(){
    this.auth.logout().then(() =>{
      this.store.dispatch(uiActions.stopLoading());
      this.router.navigate(['/login']);
    }); 
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui => { 
      console.log('Cargando estado de la UI NavBar');
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
