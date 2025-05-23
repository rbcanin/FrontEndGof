import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ProdutosPageComponent } from './pages/produtos-page/produtos-page.component';
import { EntradaProdutosComponent } from './pages/entrada-produtos/entrada-produtos.component';
import { SaidaProdutosComponent } from './pages/saida-produtos/saida-produtos.component';


export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path:'home',component: HomeComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'users', component:UserPageComponent},
    {path:'produtos', component:ProdutosPageComponent},
    {path: 'entrada-produto', component: EntradaProdutosComponent},
    {path: 'saida-produtos', component:SaidaProdutosComponent}
];

export default routes;
