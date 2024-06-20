import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AuthGuard } from './auth/auth-guard';
import { AdminGuard } from './auth/admin-guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'category-list', component: CategoryListComponent,canActivate:[AdminGuard]},
  { path: 'category-add', component: CategoryAddComponent,canActivate:[AdminGuard]},
  { path: 'category-edit/:id', component: CategoryEditComponent,canActivate:[AdminGuard]},
  { path: 'product-list', component: ProductListComponent,canActivate:[AdminGuard]},
  { path: 'product-add', component: ProductAddComponent,canActivate:[AdminGuard]},
  { path: 'product-edit/:id', component: ProductEditComponent,canActivate:[AdminGuard]},
  { path: 'product-detail/:id', component: ProductDetailComponent},
  { path: 'cart', component: CartComponent},
  { path: 'my-account', component: MyAccountComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent, HomeComponent, LoginComponent,RegisterComponent,CategoryListComponent,
    CategoryAddComponent,CategoryEditComponent
,ProductListComponent,
ProductAddComponent,ProductEditComponent,ProductDetailComponent,  CartComponent,ProductComponent,MyAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot(routes),HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

