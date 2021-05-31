import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { CognitoService } from './cognito.service';
import { AuthGuard } from './auth.guard';
import { QueryByTagComponent } from './pages/query-by-tag/query-by-tag.component';
import { QueryByImageComponent } from './pages/query-by-image/query-by-image.component';
import { AddTagComponent } from './pages/add-tag/add-tag.component';
import { DeleteImageComponent } from './pages/delete-image/delete-image.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    QueryByTagComponent,
    QueryByImageComponent,
    AddTagComponent,
    DeleteImageComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    AmplifyAngularModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [AmplifyService, CognitoService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
