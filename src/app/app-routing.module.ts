  
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { QueryByTagComponent } from './pages/query-by-tag/query-by-tag.component';
import { QueryByImageComponent } from './pages/query-by-image/query-by-image.component';
import { AddTagComponent } from './pages/add-tag/add-tag.component';
import { DeleteImageComponent } from './pages/delete-image/delete-image.component';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';


import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'query_tag', component: QueryByTagComponent, canActivate: [AuthGuard] },
  { path: 'query_image', component: QueryByImageComponent, canActivate: [AuthGuard] },
  { path: 'add_tag', component: AddTagComponent, canActivate: [AuthGuard] },
  { path: 'delete_image', component: DeleteImageComponent, canActivate: [AuthGuard] },
  { path: 'upload_image', component: UploadImageComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }