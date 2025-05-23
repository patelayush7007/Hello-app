import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TwitterSuccessComponent } from './twitter-success/twitter-success.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
export const routes: Routes = [
  { path: 'app-login', component: LoginComponent },
  { path: 'app-register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'twitter-success', component: TwitterSuccessComponent },
  // in app-routing.module.ts
  { path: 'admin', component: AdminPanelComponent },

  // { path: '**', component: PageNotFoundComponent },
];
