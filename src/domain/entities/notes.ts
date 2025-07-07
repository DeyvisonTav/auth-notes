import { Entity as EntityType } from "../../shared/types/entity";
import { Column, UpdateDateColumn, CreateDateColumn, Entity } from "typeorm";

interface NotesProps {
  id?: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

@Entity('notes')
export class Notes extends EntityType<NotesProps> {
  @Column({ type: 'varchar', length: 255, name: 'title' })
  private _title: string;
  @Column({ type: 'text', name: 'content' })
  private _content: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  private _createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  private _updatedAt: Date;
  @Column({ type: 'uuid', name: 'user_id' })
  private _userId: string;


  get title(): string {
    return this.props?.title || '';
  }

  set title(value: string) {
    if (this.props) {
      this.props.title = value;
    }
  }

  get content(): string {
    return this.props?.content || '';
  }

  set content(value: string) {
    if (this.props) {
      this.props.content = value;
    }
  }

  get userId(): string {
    return this.props?.userId || '';
  }

  get createdAt(): Date {
    return this.props?.createdAt || new Date();
  }

  get updatedAt(): Date {
    return this.props?.updatedAt || new Date();
  }

  static create(props: Omit<NotesProps, 'createdAt' | 'updatedAt'>, id?: string) {
    const notes = new Notes({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, id);
    return notes;
  }
}