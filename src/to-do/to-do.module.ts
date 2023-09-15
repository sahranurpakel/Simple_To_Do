import { Module } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { ToDoController } from './to-do.controller';
import { ToDo, ToDoSchema } from './schemas/to-do.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ToDo.name, schema: ToDoSchema }]),
  ],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
