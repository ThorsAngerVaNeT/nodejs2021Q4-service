import { v4 as uuid } from 'uuid';

export class User {
  readonly id: string;

  name: string;

  login: string;

  password: string;

  /**
   * Creates an instance of user
   * @param object - id, name, login, password
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: {
    id: string;
    name: string;
    login: string;
    password: string;
  }) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Returns data from user object ready to send in response (without password)
   * @param user - user object
   * @returns object with id, name, login without password
   */
  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
