import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AdjustData } from '../app.component';

@Component({
  selector: 'app-herstelform',
  templateUrl: './herstel.form.component.html',
  styleUrls: ['./herstel.form.component.css']
})
export class HerstelformComponent {

  constructor(
    public dialogRef: MatDialogRef<HerstelformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdjustData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
