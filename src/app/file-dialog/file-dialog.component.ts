import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileData } from '../model/models';
import { FileIOService } from '../services/file-io.service';

/** @deprecated */
@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.scss']
})
export class FileDialogComponent {
  private fileReader = new FileReader();

  file: File | null | undefined;
  fileName: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<FileDialogComponent>,
    public fileDialogReader: FileIOService,
    @Inject(MAT_DIALOG_DATA) public outData: FileData,
  ) {}

  onSelectedFile(fileInput: HTMLInputElement): void{
    this.file = fileInput.files?.item(0);
    this.fileName = fileInput.files?.item(0)?.name;

    if (this.file) {
      if (this.validateXmlFileExt(this.fileName))
        this.readXmlFile(this.file);
      else
        console.warn("Invalid file extension, file not readed.");
    }
  }

  private readXmlFile(file:File): void{
    this.fileReader.readAsArrayBuffer(file);

    this.fileReader.onload = () => {
      const arrayBuffer = this.fileReader.result;
      if (arrayBuffer instanceof ArrayBuffer){
        const fileContent = new TextDecoder("utf-8").decode(new Uint8Array(arrayBuffer));
        //fileContent = String.fromCharCode.apply(String, data);

        if (fileContent){
          const parsedData = this.parseXml(fileContent);
          this.loadData({fileContent:parsedData,fileName:undefined});
        }
      }
    }
  }

  private validateXmlFileExt(name: String|undefined): boolean{
    return name? (name.substring(name.lastIndexOf('.')+1).toLowerCase() == 'xml'): false;
  }

  private parseXml(fileContent:any){
    return this.fileDialogReader.parseXml(fileContent);
  }

  private loadData(data: FileData){
    this.fileDialogReader.setXmlFile(data);
  }

  close(): void {
    this.dialogRef.close();
  }
}
