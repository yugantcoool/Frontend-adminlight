/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { PagesMenu } from './pages-menu';
import { NbMenuModule, NbTreeGridModule, NbCardModule, NbInputModule, NbButtonModule, NbIconModule, NbContextMenuModule, NbDialogModule, NbToastrModule } from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import { StarterMenuModule } from './starter/starter.module';
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountDialogComponent } from './shared/dialogs/add-account-dialog/add-account-dialog.component';
import { ConfirmationDialogComponent } from './shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    StarterMenuModule,
    ThemeModule,
    NbMenuModule,
    AuthModule.forRoot(),
    NbTreeGridModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbContextMenuModule,
    NbDialogModule,
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot()

  ],
  declarations: [
    ...PAGES_COMPONENTS,
    AccountsComponent,
    AddAccountDialogComponent,
    ConfirmationDialogComponent,
  ],
  providers: [
    PagesMenu
  ],
})
export class PagesModule {
}
