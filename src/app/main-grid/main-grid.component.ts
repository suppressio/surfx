import { Component, Input, OnInit } from '@angular/core';

// let data: any[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, surename: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss']
})
export class MainGridComponent implements OnInit {
  @Input() data:any;
  
  displayedColumns: string[] = [];

  dataSource:any;

  constructor() { }


  ngOnInit(): void {
    if (!this.data)
      this.data = [];
    this.initData();
  }

  initData(){
    console.log("data:", this.data);
    this.displayColums();
  }

  displayColums(){
    if (this.data)
      this.data.forEach((d:any)=>{
        Object.keys(d).forEach(k=>{
          if(this.displayedColumns.indexOf(k)<0)
            this.displayedColumns.push(k);
        });
      });
      
    console.log("displayedColumns:", this.displayedColumns);
    this.dataSource = this.data;
  }

}
