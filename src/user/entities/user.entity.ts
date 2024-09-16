// src/user/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Specify the table name
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  fullname!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar'})
  password!: string;

  @Column({ type: 'varchar', length: 10 })
  phonenumber!: string;

  @Column({ type: 'boolean', default: false })
  isVerified?: boolean;

  @Column({ type: 'boolean', default: false })
  isAdmin?: boolean;

 
}
