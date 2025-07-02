import { Entity } from "../cors/entity";

interface NotesProps {
  id?: string;
  title: string;
  content: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string;
}

export class Notes extends Entity<NotesProps> {
  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get userId(): string {
    return this.props.userId;
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