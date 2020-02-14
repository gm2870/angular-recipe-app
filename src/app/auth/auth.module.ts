import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [RouterModule, SharedModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {}
