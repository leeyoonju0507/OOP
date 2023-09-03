import fs from 'fs';
import csvParser from 'csv-parser';
import * as path from 'path';

class Database {
  private readonly dataFolderPath: string;

  constructor() {
    this.dataFolderPath = path.join(__dirname, '../../src/Data');
  }

  readCSV = (filename: string) => {
    return new Promise((resolve) => {
      const results: string[] = [];
      fs.createReadStream(path.join(this.dataFolderPath, filename))
        .pipe(csvParser())
        .on('data', (data: string) => results.push(data))
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
      fileStream.write(`${content}\n`);
      fileStream.end(() => {
        resolve(true);
      });
    });
  };
}

export default Database;
