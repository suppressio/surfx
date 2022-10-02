import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreComponent } from '../core/core.component'

export interface DialogData {
  file: string;
}

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.scss']
})
export class FileDialogComponent implements OnInit {
  // @Output() outData:any;

  file: File | null | undefined;
  fileName: string | undefined;
  fileContent: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<FileDialogComponent>,
    public xmlReader: CoreComponent,
    @Inject(MAT_DIALOG_DATA) public outData: DialogData,
  ) {}

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fileSelect(fileInput: HTMLInputElement){
    fileInput.click();

    this.file = fileInput.files?.item(0);
    this.fileName = fileInput.files?.item(0)?.name;

    console.log("isXMLext?", this.validateXmlFileExt(this.fileName));

    let fileReader = new FileReader();
    if(this.file?.arrayBuffer())
      fileReader.readAsArrayBuffer(this.file);

    fileReader.onload = (e) => {
      let arrayBuffer = fileReader.result;
      if (arrayBuffer instanceof ArrayBuffer){
        var data = new Uint8Array(arrayBuffer);
        this.fileContent = new TextDecoder("utf-8").decode(data);
        //fileContent = String.fromCharCode.apply(String, data);
      }
      
      if(this.fileContent)
        this.outData = this.xmlReader.loadXml(this.fileContent);

      console.log("dialog outdata:",this.outData);
    }
  }

  validateXmlFileExt(name: String|undefined):boolean {
    if (name)
      return (name.substring(name.lastIndexOf('.')+1).toLowerCase() == 'xml');
    return false;
  }

}
