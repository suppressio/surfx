import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileData } from '../model/models';
import { XMLParser, XMLValidator, XMLBuilder } from 'fast-xml-parser';

@Injectable()
export class FileIOService {
  private _fileObs = new BehaviorSubject<FileData>({ fileContent: undefined, fileName: undefined });

  // private _xml = `<xml></xml>`;
  // private _json = {};

  private xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });

  getFileObs(): Observable<FileData> {
    return this._fileObs.asObservable();
  }

  //#region xml
  setXmlFile(xmlFileTx: FileData) {
    this._fileObs.next(xmlFileTx);
  }

  parseXml(fromFile: string | undefined): any {
    return fromFile ? this.xmlParser.parse(fromFile) : undefined;
  }

  validateXml(fromFile: string | undefined): true | string | undefined {
    if (fromFile) {
      const validation = XMLValidator.validate(fromFile);
      if (validation == true)
        return true;
      else
        return validation.err.msg;
    }
    return undefined;
  }
  //#endregion

  //#region json
  parseJson(fromFile: string | undefined): true | string | undefined {
    throw new Error("TODO: not implemented");
  }

  validateJson(fromFile: string | undefined): true | string | undefined {
    throw new Error("TODO: not implemented");
  }
  //#endregion
}
