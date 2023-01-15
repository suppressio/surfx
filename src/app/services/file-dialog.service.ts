
import { Injectable } from '@angular/core';
import { FileDialogComponent } from '../file-dialog/file-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogData } from '../model/models';
import { XMLParser, XMLValidator, XMLBuilder } from 'fast-xml-parser';

@Injectable()
export class FileDialogService{
  private xmlFileTx:string = "";
  private xmlFileObs = new BehaviorSubject<DialogData>({fileContent:undefined});

  private xml = `<xml></xml>`;
  private json = {};

  private xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });

  constructor(private dialog: MatDialog){ }

  public openDialog(): void {
    const config: MatDialogConfig = {
      width: '300px',
      data: {file: this.xmlFileTx},
    };

    this.dialog.open(FileDialogComponent, config);
  }

  getXmlFileObs(): BehaviorSubject<DialogData>{
    return this.xmlFileObs;
  }

  setXmlFile(xmlFileTx:DialogData): void{
    this.xmlFileObs.next(xmlFileTx);
  }
  
  parseXml(fromFile:string|undefined): any {
    return fromFile ? this.xmlParser.parse(fromFile) : undefined;
  }

  validateXml(fromFile:string|undefined): true|string|undefined{
    if (fromFile){
      const validation = XMLValidator.validate(fromFile);
      if (validation==true)
        return true;
      else
        return validation.err.msg;
    }
    return undefined;
  }
}
