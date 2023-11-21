import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { ActionUserComponent } from './user/action-user/action-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { UserManagementComponent } from './user-management.component';
import { ActionMenuComponent } from './menu/action-menu/action-menu.component';
import { RoleComponent } from './role/role.component'; 
import { ActionRoleComponent } from './role/action-role/action-role.component';
import { EditHakAksesComponent } from './role/edit-hak-akses/edit-hak-akses.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Select2Module } from 'ng-select2-component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    UserComponent,
    ActionUserComponent,
    MenuComponent,
    ActionMenuComponent,
    UserManagementComponent,
    RoleComponent,
    ActionRoleComponent,
    EditHakAksesComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatDialogModule,
    FormsModule,
    MatTooltipModule,
    MatPaginatorModule,
    Select2Module,
    NgbModule
  ]
})
export class UserManagementModule { }
