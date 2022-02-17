import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  file: string;
}

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.scss']
})
export class FileDialogComponent implements OnInit {

  file: File | null | undefined;
  fileName: string | undefined;
  fileContent: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<FileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
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
      console.log(e,this.fileContent);
    }
  }

  validateXmlFileExt(name: String|undefined):boolean {
    if (name)
      return (name.substring(name.lastIndexOf('.')+1).toLowerCase() == 'xml');
    return false;
  }

}