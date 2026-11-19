import { Controller, Get, Param, Post, Body, Delete, Patch, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { TaskResponseDto } from './dto/task.response.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  index(@Request() req: any): Promise<TaskResponseDto[]> {
    return this.tasksService.getAllTasks(req.user.userId); // <-- Pasamos el ID
  }

  @Get(':id')
  show(@Param('id') id: string, @Request() req: any): Promise<TaskResponseDto> {
    // (Si también actualizaste getOneTask en el servicio, añade req.user.userId aquí)
    return this.tasksService.getOneTask(id);
  }

  @Post()
  async store(@Request() req: any, @Body() createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const userId = req.user.userId;
    return this.tasksService.createOneTask(createTaskDto, userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<TaskResponseDto> {
    return this.tasksService.updateOneTask(id, updateTaskDto);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.tasksService.deleteOneTask(id);
  }
}