import Database from '../database/database.js';
import {IDomain, IEntity} from '../specification/interfaces.js';

export interface IBaseRepository {
  save: (domainObject: IDomain) => Promise<void>;
}

export default class BaseRepository implements IBaseRepository {
  protected db: Database;
  protected fileName: string;

  constructor(fileName: string) {
    this.db = new Database();
    this.fileName = fileName;
  }

  public async save(domainObject: IDomain) {
    const rows = await this.db.readCSV<IEntity>(this.fileName);
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].id === domainObject.id) {
        rows[i] = domainObject.convertEntity();
        break;
      }
    }
    await this.db.writeAllCSV(this.fileName, rows);
  }
}
