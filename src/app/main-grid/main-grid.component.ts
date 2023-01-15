import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DialogData } from '../model/models';

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss']
})
export class MainGridComponent implements OnInit, OnChanges{
  @Input() data: DialogData;
  displayedColumns: string[];
  dataSource:any;

  constructor() {
    this.data = {fileContent:undefined};
    this.displayedColumns = [];
    this.dataSource = undefined;
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    // this.flush();
    if (this.data)
      this.initData(this.data.fileContent);
  }

  private flushData(){
    this.data = {fileContent:undefined};
    this.displayedColumns = [];
    this.dataSource = undefined;
  }

  private initData(data:any){
    if (data) {
      this.displayColums(data);
      this.displayRows(data);
    }
  }

  private displayColums(data:any){
    if (data instanceof Array)
      data.forEach((d:any)=>{
        Object.keys(d).forEach(k=>{
          if(this.displayedColumns.indexOf(k)<0)
            this.displayedColumns.push(k);
        });
      });
    else
      Object.keys(data).forEach(k=>
        this.displayedColumns.push(k)
      );
  }

  private displayRows(data:any):void{
    if (data instanceof Array) {
      this.dataSource = data;
    }
    else{
      let rtnObj:any = {};
      Object.keys(data).forEach(k=>
          rtnObj[k] = "[...]"
        );
      console.log(rtnObj);
      this.dataSource = [rtnObj];
    }
  }
}
