export class User {
  public id: number;
  public login: string;
  public password: string;
  public firstName: string;
  public secondName: string;
  public stringRoles: string[];

  constructor(id: number, login: string, password: string, firstName: string, secondName: string, roles?: string[]) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.firstName = firstName;
    this.secondName = secondName;
    this.stringRoles = roles;
  }
}
