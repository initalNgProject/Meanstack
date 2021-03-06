import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.gurd';

const routes: Routes = [
  { path: '', component: PostListComponent, canActivate: [AuthGuard]},
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  { path: 'edit/:postId', component: PostCreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: [AuthGuard]
})
export class AppRoutingModule { }
