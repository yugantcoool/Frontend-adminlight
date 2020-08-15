import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  // databound properties
  data: any;
  accountName: string;

  constructor(
    protected dialogRef: NbDialogRef<ConfirmationDialogComponent>
  ) { }

  ngOnInit(): void {
    this.accountName = this.data.data.accountName;
  }

  confirm() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }

}
