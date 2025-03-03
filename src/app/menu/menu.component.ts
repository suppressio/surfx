import { Component } from '@angular/core';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isDataLoaded: boolean = false;

  constructor(
    private coreService: CoreService
  ) { }

  none(): void {
    throw new Error("Not implemented");
  }

  toggleSideBar(): void {
    this.coreService.toggle();
  }

  selectFile(): void {
    this.coreService.selectFile();
  }

  private init_isDataLoaded(): void {
    throw new Error("Not implemented");
  }
}
