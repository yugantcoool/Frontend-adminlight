import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbSortRequest, NbDialogService, NbToastrService } from '@nebular/theme';
import { AccountService } from '../services/account.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsersService } from '../../@core/backend/common/services/users.service';
import { AddAccountDialogComponent } from '../shared/dialogs/add-account-dialog/add-account-dialog.component';
import { ConfirmationDialogComponent } from '../shared/dialogs/confirmation-dialog/confirmation-dialog.component';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'ngx-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  // databound properties
  defaultColumns = ['Sr.No', 'accountName', 'accountNumber', 'accountType', 'Actions'];
  contextMenuItems = [{ title: 'Edit' }, { title: 'Delete' }];
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  @Input() newAccount: any;

  //datasource
  dataSource: NbTreeGridDataSource<FSEntry[]>;

  // observable  
  destroy$: Subject<boolean> = new Subject<boolean>();

  // arrays
  accountList: any[];

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry[]>,
    private accountService: AccountService,
    private userService: UsersService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {
    this.accountList = [];

  }
  ngOnInit(): void {

    // Load account list
    this.userService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      if (response.role == 'admin') {
        this.getAccountList();
      } else {
        this.toastrService.info("Admin role is required", "Information");
      }
    }, (error: any) => {
      this.toastrService.danger(error.message, "Error");
    });
  }

  getAccountList() {
    var data: any;
    this.accountService.accountList(data).pipe(takeUntil(this.destroy$)).subscribe((accountListResponse: any) => {
      this.accountList = accountListResponse;
      for (var i = 0; i < this.accountList.length; i++) {
        this.accountList[i]['data'] = this.accountList[i];
        this.accountList[i]['data']['Sr.No'] = i + 1;
        this.accountList[i]['children'] = [];
      }
      this.dataSource = this.dataSourceBuilder.create(this.accountList);
    }, (error: any) => {
      this.toastrService.danger(error.message, "Error");
    });
  }

  //#region TreeTable operations
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  //#endregion

  addAccount() {
    const dialogRef = this.dialogService.open(
      AddAccountDialogComponent,
      {
        closeOnBackdropClick: true, hasBackdrop: true,
        context: { data: {} }
      }).onClose.subscribe((response: any) => {
        if (response) {
          var data: any = {};
          data = response;
          this.accountService.accountAdd(data).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
            this.toastrService.success("Account added successfully!", "Success");
            this.getAccountList();
          }, (error: any) => {
            this.toastrService.danger(error.message, "Error");
          });
        }
      });
  }

  editAccount(row) {
    const dialogRef = this.dialogService.open(
      AddAccountDialogComponent,
      {
        closeOnBackdropClick: true, hasBackdrop: true,
        context: { data: row }
      }).onClose.subscribe((response: any) => {
        var data: any = {};
        data = response;
        this.accountService.accountUpdate(data).pipe(takeUntil(this.destroy$)).subscribe((updateResponse: any) => {
          if (updateResponse.ack) {
            this.toastrService.success("Account updated successfully", "Success");
            this.getAccountList();
          }
        }, (error: any) => {
          this.toastrService.danger(error.message, "Error");
        })
      });
  }

  deleteAccount(row) {

    const dialogRef = this.dialogService.open(
      ConfirmationDialogComponent,
      {
        closeOnBackdropClick: true, hasBackdrop: true,
        context: { data: row }
      }).onClose.subscribe((response: any) => {
        if (response) {
          var data: any = {};
          data._id = row.data.data._id;
          this.accountService.accountDelete(data).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
            if (response.ack) {
              this.toastrService.success("Account deleted successfully!", "Success");
              this.getAccountList();
            }
          }, (error: any) => {
            this.toastrService.danger(error.message, "Error");
          });
        }
      });

  }

  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

}

