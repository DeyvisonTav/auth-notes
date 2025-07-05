import { Entity } from "../../shared/types/entity";
import { Notes } from "./notes";

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  notes?: Notes[];
}

export class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name;
  }

  get notes(): Notes[] {
    return this.props.notes ?? [];
  }

  set notes(value: Notes[]) {
    this.props.notes = value;
  }

  get email(): string {
    return this.props.email;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get password(): string {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
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