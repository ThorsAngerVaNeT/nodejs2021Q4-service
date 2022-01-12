import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  login: string;

  @Column('varchar')
  password: string;

  /**
   * Creates an instance of user
   * @param object - name, login, password
   */
  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: Partial<User> = {}) {
    this.id = uuid();
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
