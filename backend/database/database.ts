import fs from 'fs';
import csvParser from 'csv-parser';
import * as path from 'path';
import {IDataCSV} from '../domain/product/product.js';

export interface IDatabase {
  readCSV<T>(filename: string): Promise<T[]>;
  appendCSV(filename: string, content: string): Promise<any>;
  writeAllCSV(filename: string, contentList: IDataCSV[]): Promise<void>;
}

export default class Database implements IDatabase {
  private readonly dataFolderPath: string;

  constructor() {
    const __dirname = path.resolve();
    this.dataFolderPath = path.join(__dirname, '../backend/data');
  }

  readCSV = <T>(filename: string): Promise<T[]> => {
    return new Promise((resolve) => {
      const results: T[] = [];
      fs.createReadStream(path.join(this.dataFolderPath, filename))
        .pipe(csvParser())
        .on('data', (data: T) => results.push(data))
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
      const randomId = Math.random() + Date.now();
      fileStream.write(`${randomId},${content}\n`);
      fileStream.end(() => {
        resolve(true);
      });
    });
  };

  writeAllCSV = (filename: string, contentList: IDataCSV[]): Promise<void> => {
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
      for (let i = 0; i < contentList.length; i++) {
        //contentList[i]이 무엇이든 간에 string으로 바뀜
        totalContent += `${contentList[i].convertStringForCSV()}\n`;
      }
      fileStream.write(totalContent);
      fileStream.end(() => {
        resolve();
      });
    });
  };
}
