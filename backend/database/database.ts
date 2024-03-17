import fs from 'fs';
import csvParser from 'csv-parser';
import * as path from 'path';
import {IEntity} from '../specification/interfaces.js';

export interface IDatabase {
  readCSV<T extends IEntity>(filename: string): Promise<T[]>;
  appendCSV(filename: string, content: string): Promise<any>;
  writeAllCSV(filename: string, entityList: IEntity[]): Promise<void>;
}

export default class Database implements IDatabase {
  private readonly dataFolderPath: string;

  constructor() {
    const __dirname = path.resolve();
    this.dataFolderPath = path.join(__dirname, '../backend/data');
  }

  readCSV = <T extends IEntity>(filename: string): Promise<T[]> => {
    return new Promise((resolve) => {
      const results: T[] = [];
      fs.createReadStream(path.join(this.dataFolderPath, filename))
        .pipe(csvParser())
        .on('data', (data: {[key: string]: string}) => {
          const entityData: {[key: string]: any} = {};
          Object.entries(data).forEach(([k, v]) => {
            if (k === 'id' || k === 'money' || k === 'price') {
              entityData[k] = parseInt(v);
            } else if (k === 'isSoldOut') {
              entityData[k] = v === 'true';
            } else if (k === 'buyerEmail' && v === 'null') {
              entityData[k] = null;
            } else {
              entityData[k] = v;
            }
          });
          results.push(entityData as T);
        })
        .on('end', () => {
          resolve(results);
        });
    });
  };
  appendCSV = (filename: string, content: string) => {
    return new Promise((resolve) => {
      const fileStream = fs.createWriteStream(path.join(this.dataFolderPath, filename), {
        flags: 'a',
      });
      const id = Date.now();
      fileStream.write(`${id},${content}\n`);
      fileStream.end(() => {
        resolve(true);
      });
    });
  };
  writeAllCSV = (filename: string, entityList: IEntity[]): Promise<void> => {
    return new Promise((resolve) => {
      const fileStream = fs.createWriteStream(path.join(this.dataFolderPath, filename), {
        flags: 'w',
      });

      let totalContent = '';
      if (filename === 'products.csv') {
        totalContent += 'id,title,price,content,sellerEmail,buyerEmail,isSoldOut\n';
      } else if (filename === 'users.csv') {
        totalContent += 'id,email,password,nickname,money,userType\n';
      }
      for (let i = 0; i < entityList.length; i++) {
        totalContent += Object.values(entityList[i]).join(',');
        totalContent += `\n`;
      }
      fileStream.write(totalContent);
      fileStream.end(() => {
        resolve();
      });
    });
  };
}
