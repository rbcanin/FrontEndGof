import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { EstoquePageComponent } from './pages/estoque-page/estoque-page.component';


export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path:'home',component: HomeComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'users', component:UserPageComponent},
    {path:'estoque', component:EstoquePageComponent}
];

export default routes;
