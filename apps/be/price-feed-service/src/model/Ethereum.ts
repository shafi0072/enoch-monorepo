import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity
} from 'typeorm';

@Entity('ethereum')
export class Ethereum extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('character varying', { length: 255 })
  crypto!: string;

  @Column('character varying', { length: 255 })
  fiat!: string;

  @Column('float')
  medianizedPrice!: number;

  @Column('int')
  sources!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
