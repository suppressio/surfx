import { Component } from '@angular/core';
import { DialogData } from '../model/models';
import { FileDialogService } from '../services/file-dialog.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {
  data: DialogData;
  constructor(
    private fileSelect: FileDialogService
    ) {
      this.data = {fileContent:undefined};
    }

  openFileDialog(): void {
    this.fileSelect.openDialog();
    this.fileSelect.getXmlFileObs().subscribe(
      (data:DialogData) => this.data = data);
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
