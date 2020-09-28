import { Tag } from './Tag';

export class Certificate {
  public id?: number;
  public name?: string;
  public description?: string;
  public price?: number;
  public creationDate?: Date;
  public modificationDate?: Date;
  public durationDays?: string;
  public tags?: Tag[];

  constructor() {
  }
}
