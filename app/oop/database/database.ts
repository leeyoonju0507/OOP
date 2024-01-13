import fs from 'fs';
import csvParser from 'csv-parser';
import * as path from 'path';

export interface IDatabase {
  readCSV(filename: string): Promise<{[key: string]: string}[]>;
  writeCSV(filename: string, content: string): Promise<any>;
}

export default class Database implements IDatabase {
  private readonly dataFolderPath: string;

  constructor() {
    const __dirname = path.resolve();
    this.dataFolderPath = path.join(__dirname, '../../../src/oop/data');
  }

  readCSV = (filename: string): Promise<{[key: string]: string}[]> => {
    return new Promise((resolve) => {
      const results: {[key: string]: string}[] = [];
      fs.createReadStream(path.join(this.dataFolderPath, filename))
        .pipe(csvParser())
        .on('data', (data: {[key: string]: string}) => results.push(data))
        .on('end', () => {
          resolve(results);
        });
    });
  };
  writeCSV = (filename: string, content: string) => {
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
}
