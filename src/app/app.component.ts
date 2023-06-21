import { Component, OnInit } from '@angular/core';
import { rawData } from './raw-data';
import { MockApiService, RoleTypeEnum } from './mock-api.service';
import { EMPTY, catchError, switchMap, tap, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HerstelformComponent } from './herstelform/herstel.form.component';

export interface AdjustData {
  name: string;
  email: string;
  role: string;
  status?: string;
  error?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  adjustedData: AdjustData[];
  showData: AdjustData[];

  constructor(private mockApi: MockApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadRawData();
  }

  private loadRawData() {
    this.adjustedData = rawData;
    this.showData = [...this.adjustedData];
  }

  clickSubmit() {
    for (let dataRow of this.adjustedData) {
      this.mockApi
        .createUser(dataRow.name, dataRow.email)
        .pipe(
          switchMap((user) =>
            this.mockApi.createRole(user.id, dataRow.role as RoleTypeEnum)
          ),
          tap(() => (dataRow.status = 'Goed')),
          switchMap((role) =>
            role.roleType === RoleTypeEnum.student
              ? this.mockApi.createPortfolio(role.userId)
              : EMPTY
          ),
          catchError((error) => throwError(() => error))
        )
        .subscribe({
          error: (e) => {
            dataRow.status = 'Fout';
            dataRow.error = e;
          },
          complete: () => {
            this.adjustedData.splice(
              this.adjustedData.findIndex((data) => data.status === 'Goed'),
              1
            );
            this.showData = [...this.adjustedData];
          },
        });
    }
  }

  corrigeerData(data: AdjustData): void {
    const index = this.adjustedData.indexOf(data);
    const dialogRef = this.dialog.open(HerstelformComponent, {
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        error: data.error,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adjustedData[index] = result;
        this.showData = [...this.adjustedData];
      }
    });
  }
}
