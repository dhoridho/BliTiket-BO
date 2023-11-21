import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RoleComponent } from './role/role.component';
import { UserManagementComponent } from './user-management.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
        {
            path: 'user',
            component: UserComponent
        },
        {
            path: 'menu',
            component: MenuComponent
        },
        {
            path: 'role',
            component: RoleComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
