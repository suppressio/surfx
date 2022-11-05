
import { Injectable } from '@angular/core';
import { FileDialogComponent } from '../file-dialog/file-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FileDialogService{
  private xmlFileTx:string = "";;
  private xmlFileObs = new BehaviorSubject<string>(this.xmlFileTx);

  constructor(private dialog: MatDialog){
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(FileDialogComponent, {
      width: '300px',
      data: {file: this.xmlFileTx},
    });

    console.log("dialogRef", dialogRef);
  }


  getXmlFileObs(): Observable<string>{
    return this.xmlFileObs;
  }
}
