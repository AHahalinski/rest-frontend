import { Certificate } from './Certificate';
export class Order {
  public id?: number;
  public creationDate?: string;
  public userId?: number;
  public totalPrice?: number;
  public certificates: Certificate[];

  constructor(certificates: Certificate[]) {
    this.certificates = certificates;
  }
}
