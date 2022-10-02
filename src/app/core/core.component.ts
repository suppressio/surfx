import { Component, OnInit } from '@angular/core';
import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {
  xml = `<xml></xml>`;
  json = {};

  constructor( ) {
  }

  loadXml(file:string|undefined): any {
    if (file){
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
      });
      const xml = parser.parse(file);

      // if (xml && xml.settings.menu.menuGroup.length) {
      //   const menuElems = xml.settings.menu.menuGroup.map((data:any) => {
      //     console.log(data);

      //     return data;
      //   });
      return xml;
    }
  }
}
