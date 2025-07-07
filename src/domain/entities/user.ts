import { Entity as EntityType } from "../../shared/types/entity";
import { Notes } from "./notes";
import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: Notes[];
}

@Entity('users')
export class User extends EntityType<UserProps> {
  @Column({ type: 'varchar', length: 255, name: 'name' })
  private _name: string;
  @Column({ type: 'varchar', length: 255, name: 'email' })
  private _email: string;
  @Column({ type: 'varchar', length: 255, name: 'password' })
  private _password: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  private _createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  private _updatedAt: Date;
  @OneToMany(() => Notes, (note) => note.userId)
  private _notes: Notes[];



  get name(): string {
    return this.props?.name || '';
  }

  get notes(): Notes[] {
    return this.props?.notes ?? [];
  }

  set notes(value: Notes[]) {
    if (this.props) {
      this.props.notes = value;
    }
  }

  get email(): string {
    return this.props?.email || '';
  }

  set name(value: string) {
    if (this.props) {
      this.props.name = value;
    }
  }

  set email(value: string) {
    if (this.props) {
      this.props.email = value;
    }
  }

  get password(): string {
    return this.props?.password || '';
  }

  set password(value: string) {
    if (this.props) {
      this.props.password = value;
    }
  }

  get createdAt(): Date {
    return this.props?.createdAt || new Date();
  }

  get updatedAt(): Date {
    return this.props?.updatedAt || new Date();
  }

  static create(props: Omit<UserProps, 'createdAt' | 'updatedAt'>, id?: string) {
    const user = new User({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, id);
    return user;
  }
}