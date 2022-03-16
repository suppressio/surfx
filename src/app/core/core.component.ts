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

      if (xml && xml.channel.item.length) {
        const episodes = xml.channel.item.map((data:any) => {
          console.log(data);
        });
    
        if (Array.isArray(episodes) && episodes.length !== 0) {
          // Successful
          return { episodes };
        }
      }
    }

    return null;
  }
}
