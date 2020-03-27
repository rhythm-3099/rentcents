import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from "./homepage/home.component";
import { HeaderComponent} from "./header/header.component";

import { MatCardModule } from '@angular/material/card';
import {  MatFormFieldModule} from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

import {MatPaginatorModule} from '@angular/material/paginator';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './auth/signup/signup.component';
import { UploadItemComponent } from './uploadItem/uploaditem.component';
import {MatSelectModule} from '@angular/material/select';
import { UserProfileComponent } from './userProfile/userprofile.component';
import { UpdateUserProfileComponent } from './updateUserProfile/updateuserprofile.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { BookproductComponent } from './bookproduct/bookproduct.component';
import { User_item_service } from './services/user_item.service';
import { ProductCategorizeComponent } from './productCategorization/productcategorize.component';
import { AboutComponent } from './about/about.component';
import { PaymentComponent } from './payment/payment.component';
import { VehicleComponent } from './vehiclecategory/vehicle.component';
import { RealestateComponent } from './realestatecategory/realestate.component';
import { EducationalComponent } from './educationalcategory/educational.component';
import { SportsComponent } from './sportscategory/sports.component';
import { ElectronicsComponent } from './electronicscategory/electronics.component';
import { FurnitureComponent } from './furniturecategory/furniture.component';
import { OthersComponent } from './otherscategory/others.component';
import { BooksComponent } from './bookscategory/books.component';
import { ClothingComponent } from './clothingcategory/clothing.component';
import { HobbyComponent } from './hobbycategory/hobby.component';
import { HelppageComponent } from './helppage/helppage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    UploadItemComponent,
    UserProfileComponent,
    UpdateUserProfileComponent,
    ViewproductComponent,
    BookproductComponent,
    ProductCategorizeComponent,
    AboutComponent,
    PaymentComponent,
    VehicleComponent,
    RealestateComponent,
    EducationalComponent,
    ElectronicsComponent,
    SportsComponent,
    FurnitureComponent,
    BooksComponent,
    OthersComponent,
    ClothingComponent,
    HobbyComponent,
    HelppageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatGridListModule,
    RouterModule,
    HttpClientModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [User_item_service],
  bootstrap: [AppComponent]
})
export class AppModule { }
