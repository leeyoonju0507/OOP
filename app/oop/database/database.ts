import fs from 'fs';
import csvParser from 'csv-parser';
import * as path from 'path';
import Product from '../domain/product/product';

export interface IDatabase {
  readCSV(filename: string): Promise<{[key: string]: string}[]>;
  writeCSV(filename: string, content: string): Promise<any>;
  updateCSV(filename: string, updateRow: string[]): Promise<any>;
}

export default class Database implements IDatabase {
  private readonly dataFolderPath: string;

  constructor() {
    this.dataFolderPath = path.join(__dirname, '../../../oop/data');
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
      if (filename === 'products.csv') {
        fileStream.write(`${randomId},${content}\n`);
      } else {
        fileStream.write(`${content}\n`);
      }
      fileStream.end(() => {
        resolve(true);
      });
    });
  };
  modifyCSV = (filename: string, store_1: any) => {
    return new Promise((resolve) => {
      const fileStream1 = fs.createWriteStream(path.join(this.dataFolderPath, filename), {
        flags: 'w',
      });
      fileStream1.write('id,title,content,price,sellerEmail,isSoldOut\n');
      for (let i = 0; i < store_1.length; i++) {
        fileStream1.write(
          `${store_1[i].id},${store_1[i].title},${store_1[i].content},${store_1[i].price},${store_1[i].sellerEmail},${store_1[i].isSoldOut}\n`,
        );
      }
      fileStream1.end(() => {
        resolve(true);
      });
    });
  };
  updateCSV = (filename: string, updateRow: string[]) => {
    return new Promise(async (resolve) => {
      const fileStream2 = fs.createWriteStream(path.join(this.dataFolderPath, filename), {
        flags: 'a',
      });
      //
      const readData = await this.readCSV(filename);
      const store_1 = [];
      const store_2 = [];
      let index;
      const store_3 = [];
      for (let i = 0; i < readData.length; i++) {
        if (readData[i].id === updateRow[0]) {
          for (let j = 0; j < updateRow.length; j++) {
            store_2.push(updateRow[j]);
          }
          index = i;
          break;
        }
        store_1.push(readData[i]);
      }
      if (!index) {
        return;
      }
      for (let i = index + 1; i < readData.length; i++) {
        store_3.push(readData[i]);
      }

      //
      await this.modifyCSV(filename, store_1);

      fileStream2.write(
        `${store_2[0]},${store_2[1]},${store_2[2]},${store_2[3]},${store_2[4]},${store_2[5]}\n`,
      );

      for (let i = 0; i < store_3.length; i++) {
        fileStream2.write(
          `${store_3[i].id},${store_3[i].title},${store_3[i].content},${store_3[i].price},${store_3[i].sellerEmail},${store_3[i].isSoldOut}\n`,
        );
      }
      //
      fileStream2.end(() => {
        resolve(true);
      });
    });
  };
  // updateCSV = (filename: string, id: string) => {
  //   return new Promise(async (resolve) => {
  //     const fileStream1 = fs.createWriteStream(path.join(this.dataFolderPath, filename), {
  //       flags: 'w',
  //     });
  //     const fileStream2 = fs.createWriteStream(path.join(this.dataFolderPath, filename), {
  //       flags: 'a',
  //     });
  //     //
  //     const readData = await this.readCSV(filename);
  //     const store_1 = [];
  //     const store_2 = [];
  //     let index;
  //     const store_3 = [];
  //     for (let i = 0; i < readData.length; i++) {
  //       if (readData[i].id === id) {
  //         store_2.push(readData[i]);
  //         index = i;
  //         break;
  //       }
  //       store_1.push(readData[i]);
  //     }
  //     if (!index) {
  //       return;
  //     }
  //     for (let i = index + 1; i < readData.length; i++) {
  //       store_3.push(readData[i]);
  //     }
  //     //
  //     for (let i = 0; i < store_1.length; i++) {
  //       fileStream1.write(
  //         `${store_1[i].id},${store_1[i].title},${store_1[i].content},${store_1[i].price},${store_1[i].sellerEmail},${store_1[i].isSoldOut}`,
  //       );
  //     }
  //     fileStream2.write(`${store_2[0]}\n`);
  //     for (let i = 0; i < store_3.length; i++) {
  //       fileStream2.write(
  //         `${store_3[i]},${store_3[i].title},${store_3[i].content},${store_3[i].price},${store_3[i].sellerEmail},${store_3[i].isSoldOut}`,
  //       );
  //     }
  //     //
  //     await fileStream1.end(() => {
  //       resolve(true);
  //     });
  //     await fileStream2.end(() => {
  //       resolve(true);
  //     });
  //   });
  // };
}
