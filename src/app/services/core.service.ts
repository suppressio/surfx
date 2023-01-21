
import { ElementRef, Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FileData } from '../model/models';

@Injectable()
export class CoreService{
  private drawer: MatDrawer | undefined;
  private fileInput: ElementRef | undefined;
  private data: FileData | undefined;

  constructor(){ }

  setDrawer(drawer: MatDrawer):void {
    this.drawer = drawer;
  }
  
  toggle(): void {
    this.drawer?.toggle();
  }

  setFileInput(fileInput: ElementRef){
    this.fileInput = fileInput;
  }

  selectFile(){
    const click_event = new MouseEvent('click', {bubbles: false});
    this.fileInput?.nativeElement.dispatchEvent(click_event);
  }

}
