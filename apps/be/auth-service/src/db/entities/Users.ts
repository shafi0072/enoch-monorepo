import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
