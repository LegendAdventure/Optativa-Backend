import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { TaskResponseDto } from './dto/task.response.dto.js';
import { TasksEntity } from './tasks.entity.js';
import { UsersRepository } from '../users/users.repository.js';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  @Get()
  async getAllTasks(userId: string): Promise<TaskResponseDto[]> {
    // Buscamos las tareas pertenecientes al usuario
    const tasks = await this.tasksRepository.findByUserId(userId);
    
    return tasks.map((task) => this.mapToResponseDto(task));
  }

  async getOneTask(id: string): Promise<TaskResponseDto> {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    const entity = TasksEntity.fromPrisma(task);
    return this.mapToResponseDto(entity);
  }

  async createOneTask(createTaskDto: CreateTaskDto, userId: string): Promise<TaskResponseDto> {
    const newTask = await this.tasksRepository.create({
      description: createTaskDto.descriptionTask,
      userId: userId,
      completed: createTaskDto.completedTask ?? false,
    });
    
    // CORREGIDO: Convertimos a Entidad antes de mapear
    const entity = TasksEntity.fromPrisma(newTask);
    return this.mapToResponseDto(entity);
  }

  async deleteOneTask(id: string): Promise<TaskResponseDto> {
    try {
      const deletedTask = await this.tasksRepository.delete(id);
      const entity = TasksEntity.fromPrisma(deletedTask);
      return this.mapToResponseDto(entity);
    } catch (error) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateOneTask(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskResponseDto> {
    try {
      const updatedTask = await this.tasksRepository.update(id, updateTaskDto as any);
      const entity = TasksEntity.fromPrisma(updatedTask);
      return this.mapToResponseDto(entity);
    } catch (error) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  private mapToResponseDto(task: TasksEntity): TaskResponseDto {
    return {
      idTask: task.id,
      descriptionTask: task.description,
      completedTask: task.isCompleted(),
      idUser: task.userId,
    };
  }
}