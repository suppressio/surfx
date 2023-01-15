import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../model/models';
import { FileDialogService } from '../services/file-dialog.service';

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
    public fileDialogReader: FileDialogService,
    @Inject(MAT_DIALOG_DATA) public outData: DialogData,
  ) {}

  onSelectedFile(fileInput: HTMLInputElement): void{
    this.file = fileInput.files?.item(0);
    this.fileName = fileInput.files?.item(0)?.name;

    if(this.file && this.validateXmlFileExt(this.fileName))
      this.readXmlFile(this.file);
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
          this.loadData({fileContent:parsedData });
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

  private loadData(data: DialogData){
    this.fileDialogReader.setXmlFile(data);
  }

  close(): void {
    this.dialogRef.close();
  }
}
