import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('to-do')
@UseGuards(AuthGuard)
export class ToDoController {
  constructor(private toDoService: ToDoService) {}
  @Get()
  getAll() {
    return this.toDoService.getAll();
  }
  @Get(':id')
  getOneTodo(@Param('id') id: string) {
    return this.toDoService.getOneTodo(id);
  }
  @Post()
  create(@Body() dto: CreateToDoDto) {
    return this.toDoService.create(dto);
  }
  @Put(':id')
  update(@Body() dto: CreateToDoDto, @Param('id') id: string) {
    return this.toDoService.update(dto, id);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.toDoService.delete(id);
  }
}
