import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./homepage/home.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { UploadItemComponent } from './uploadItem/uploaditem.component';
import { UserProfileComponent } from './userProfile/userprofile.component';
import { UpdateUserProfileComponent } from './updateUserProfile/updateuserprofile.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { BookproductComponent } from './bookproduct/bookproduct.component';
import { ProductCategorizeComponent } from './productCategorization/productcategorize.component';

const routes: Routes = [
  { path:'' ,component: HomeComponent},
  {path: 'homepage', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'uploaditem', component: UploadItemComponent},
  {path: 'userprofile', component: UserProfileComponent},
  {path: 'updateuserprofile', component: UpdateUserProfileComponent},
  {path: 'viewproduct', component: ViewproductComponent},
  {path: 'bookproduct', component: BookproductComponent},
  {path: 'productcategorize', component: ProductCategorizeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
