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
import { AboutComponent } from './about/about.component';
import { VehicleComponent } from './vehiclecategory/vehicle.component';
import { RealestateComponent } from './realestatecategory/realestate.component';
import { EducationalComponent } from './educationalcategory/educational.component';
import { SportsComponent } from './sportscategory/sports.component';
import { ElectronicsComponent } from './electronicscategory/electronics.component';
import { FurnitureComponent } from './furniturecategory/furniture.component';
import { BooksComponent } from './bookscategory/books.component';
import { OthersComponent } from './otherscategory/others.component';
import { ClothingComponent } from './clothingcategory/clothing.component';
import { HobbyComponent } from './hobbycategory/hobby.component';
import { HelppageComponent } from './helppage/helppage.component';
import { ChatpageComponent } from './chatpage/chatpage.component';
import { PaydoneComponent } from './paydone/paydone.component';


const routes: Routes = [
  { path:'' ,component: HomeComponent},
  {path: 'homepage', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'uploaditem', component: UploadItemComponent},
  {path: 'userprofile', component: UserProfileComponent},
  {path: 'updateuserprofile', component: UpdateUserProfileComponent},
  {path: 'viewproduct', component: ViewproductComponent},
  {path: 'bookproduct', component: BookproductComponent},
  {path: 'productcategorize', component: ProductCategorizeComponent},
  //{path: 'payment', component: PaymentComponent},
  {path: 'vehicles', component: VehicleComponent},
  {path: 'realestate', component: RealestateComponent},
  {path: 'educational', component: EducationalComponent},
  {path: 'sports', component: SportsComponent},
  {path: 'electronics', component: ElectronicsComponent},
  {path: 'furniture', component: FurnitureComponent},
  {path: 'books', component: BooksComponent},
  {path: 'others', component: OthersComponent},
  {path: 'clothing', component: ClothingComponent},
  {path: 'hobby', component: HobbyComponent},
  {path: 'helppage', component: HelppageComponent},
  {path: 'helppage', component: HelppageComponent},
  {path: 'chatpage', component: ChatpageComponent},
  {path: 'paydone', component: PaydoneComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
