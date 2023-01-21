import { Component, OnInit } from '@angular/core';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isDataLoaded:boolean=false;

  constructor(
    private coreService:CoreService
  ) { }

  ngOnInit(): void {
  }

  none():void {}

  toggleSideBar(){
    this.coreService.toggle();
  }
  
  selectFile(){
    this.coreService.selectFile();
  }

  private init_isDataLoaded(){
  }
}
