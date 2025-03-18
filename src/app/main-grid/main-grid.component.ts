import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FileData } from '../model/models';

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss']
})
export class MainGridComponent implements OnChanges{
  @Input() data: FileData;
  displayedColumns: string[];
  dataSource:any;

  constructor() {
    this.data = {fileContent:undefined, fileName:undefined};
    this.displayedColumns = [];
    this.dataSource = undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("[MainGridComponent] ngOnChanges");
    // this.flush();
    if (this.data)
      this.initData(this.data.fileContent);
  }

  private flushData(): void {
    this.data = {fileContent:undefined,fileName:undefined};
    this.displayedColumns = [];
    this.dataSource = undefined;
  }

  private initData(data:any): void {
    if (data) {
      this.displayColums(data);
      this.displayRows(data);
    }
  }

  private displayColums(data:any): void {
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

  private displayRows(data:any): void {
    if (data instanceof Array) {
      this.dataSource = data;
    }
    else{
      let rtnObj:any = {};
      Object.keys(data).forEach(k=>
          rtnObj[k] = "[...]"
        );
      console.log("[MainGridComponent] displayRows:", {rtnObj});
      this.dataSource = [rtnObj];
    }
  }
}
