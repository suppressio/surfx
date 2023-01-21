import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FileData } from '../model/models';
import { CoreService } from '../services/core.service';
import { FileIOService } from '../services/file-io.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit{
  @ViewChild('drawer', { static: true }) private drawer!: MatDrawer;
  @ViewChild('fileInput', { static: true }) private fileInputElem!: ElementRef;

  data: FileData;

  private fileReader = new FileReader();

  constructor(
    private fileSelect: FileIOService,
    private coreService: CoreService
    ) {
      this.data = {fileContent:undefined,fileName:undefined};
    }
  
  ngOnInit(): void {
    this.fileSelect.getXmlFileObs().subscribe(
      (data:FileData) => this.data = data);

    this.coreService.setDrawer(this.drawer);
    this.coreService.setFileInput(this.fileInputElem);
  }

  onSelectedFile(fileInput: HTMLInputElement): void{
    const file = fileInput.files?.item(0);
    const fileName = fileInput.files?.item(0)?.name;

    if(file && fileName && this.validateXmlFileExt(fileName))
      this.readXmlFile(file, fileName);
  }

  private readXmlFile(file:File, fileName:string): void{
    this.fileReader.readAsArrayBuffer(file);

    this.fileReader.onload = () => {
      const arrayBuffer = this.fileReader.result;
      if (arrayBuffer instanceof ArrayBuffer){
        const fileContent = new TextDecoder("utf-8").decode(new Uint8Array(arrayBuffer));
        //fileContent = String.fromCharCode.apply(String, data);

        if (fileContent){
          const parsedData = this.parseXml(fileContent);
          this.loadData({fileContent:parsedData, fileName});
        }
      }
    }
  }

  private validateXmlFileExt(name: String|undefined): boolean{
    return name? (name.substring(name.lastIndexOf('.')+1).toLowerCase() == 'xml'): false;
  }

  private parseXml(fileContent:any){
    return this.fileSelect.parseXml(fileContent);
  }

  private loadData(data: FileData){
    this.fileSelect.setXmlFile(data);
  }

  // TODO
  private loadJson(): any {
    throw new Error("Unimplemented");
  }

  // TODO
  private modelXml(xml:any) {
    if (xml && xml.settings.menu.menuGroup.length) {
      const menuElems = xml.settings.menu.menuGroup.map(
        (data:any) => {
        console.log("core",data);
        return data;
      });
    }
    return xml;
  }
}
