import { randomUUID } from 'crypto';
import { PrimaryGeneratedColumn } from 'typeorm';

export class Entity<Props> {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  private _id: string;

  protected props: Props;

  get id(): string {
    return this._id;
  }

  constructor(props: Props, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }
}