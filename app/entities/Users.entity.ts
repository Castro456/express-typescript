import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn
} from "typeorm"

@Entity(({ name: "users" }))
export class Users {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({nullable: false })
  f_name: string;

  @Column({nullable: false })
  l_name: string;

  @Column({nullable: false, unique: true }) // uname should likely be unique
  u_name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true }) // Phone number should likely be unique
  phone: string;

  @Column({ nullable: false })
  password: string; // Store the hash, NOT the plain password

  @Column({ type: "text", nullable: true }) // refresh_token can be nullable
  refresh_token: string | null; // Use null or undefined for optional refresh tokens.

  @Column({ type: "smallint", nullable: false, default: 0 }) // last_login can be nullable
  is_active: number;
  
  @Column({ type: "date", nullable: true }) // last_login can be nullable
  last_login: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}
