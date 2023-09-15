import { Injectable } from '@nestjs/common';
import { ToDoInterface } from './interfaces/to-do.interface';
import { Model } from 'mongoose';
import { ToDo, ToDoDocument } from './schemas/to-do.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ToDoService {
  // private readonly todos: ToDoInterface[] = [];
  constructor(
    @InjectModel(ToDo.name) private todosModel: Model<ToDoDocument>,
  ) {}
  async create(todo: ToDoInterface) {
    return await this.todosModel.create(todo);
  }
  async getAll() {
    return await this.todosModel.find();
  }
  async getOneTodo(id: string) {
    return await this.todosModel.findById(id);
  }
  async update(todo: ToDoInterface, id: string) {
    return await this.todosModel.findByIdAndUpdate(id, todo, { new: true });
  }
  async delete(id: string) {
    return await this.todosModel.findByIdAndDelete(id);
  }
}
