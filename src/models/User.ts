import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('timestamp with time zone')
  birthDate: Date;

  @Column()
  phone: string;

  @Column()
  street: string;

  @Column()
  homeNumber: string;

  @Column()
  neighborhood: string;

  @Column()
  zipCode: string;

  @Column()
  office_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
