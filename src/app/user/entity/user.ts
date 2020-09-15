export class User {
  public id: number;
  public login: string;
  public password: string;
  public firstName: string;
  public secondName: string;
  public roles: string[];

  constructor(login: string, password: string, id?: number, firstName?: string, secondName?: string, roles?: string[]) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.firstName = firstName;
    this.secondName = secondName;
    this.roles = roles;
  }
}
