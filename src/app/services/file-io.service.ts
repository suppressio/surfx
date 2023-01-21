import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileData } from '../model/models';
import { XMLParser, XMLValidator, XMLBuilder } from 'fast-xml-parser';

@Injectable()
export class FileIOService{
  private xmlFileObs = new BehaviorSubject<FileData>({fileContent:undefined,fileName:undefined});

  private xml = `<xml></xml>`;
  private json = {};

  private xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });

  constructor(){ }

  getXmlFileObs(): BehaviorSubject<FileData>{
    return this.xmlFileObs;
  }

  setXmlFile(xmlFileTx:FileData){
    this.xmlFileObs.next(xmlFileTx);
  }
  
  parseXml(fromFile:string|undefined): any {
    return fromFile ? this.xmlParser.parse(fromFile) : undefined;
  }

  validateXml(fromFile:string|undefined): true|string|undefined{
    if (fromFile){
      const validation = XMLValidator.validate(fromFile);
      if (validation==true)
        return true;
      else
        return validation.err.msg;
    }
    return undefined;
  }
}
