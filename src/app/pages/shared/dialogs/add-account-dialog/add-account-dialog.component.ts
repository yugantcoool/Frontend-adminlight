import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-account-dialog',
  templateUrl: './add-account-dialog.component.html',
  styleUrls: ['./add-account-dialog.component.css']
})
export class AddAccountDialogComponent implements OnInit {

  // databound properties
  data: any;
  accountName: string;
  accountNumber: number;
  accountType: string;

  constructor(
    protected dialogRef: NbDialogRef<AddAccountDialogComponent>
  ) {
    this.accountName = '';
    this.accountType = '';
  }

  ngOnInit(): void {
    if (this.data.data) {
      console.log(this.data);
      this.accountName = this.data.data.accountName;
      this.accountNumber = this.data.data.accountNumber;
      this.accountType = this.data.data.accountType;
    }
  }

  confirm() {
    var data: any = {};

    if (this.data.data) {
      data._id = this.data.data._id;
    }
    data.accountName = this.accountName;
    data.accountNumber = this.accountNumber;
    data.accountType = this.accountType;

    this.dialogRef.close(data);
  }

  close() {
    this.dialogRef.close(false);
  }

}
