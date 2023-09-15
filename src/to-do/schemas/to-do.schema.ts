import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ToDoDocument = HydratedDocument<ToDo>;

@Schema()
export class ToDo {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: User } })
  createdBy: User;

  @Prop([String])
  tags: string[];
}
export const ToDoSchema = SchemaFactory.createForClass(ToDo);
