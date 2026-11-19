import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { Task } from '@prisma/client';
import { TasksEntity } from './tasks.entity.js';
@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findByUserId(userId: string): Promise<TasksEntity[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    
    // Mapeamos los resultados de Prisma a nuestra entidad de dominio
    return tasks.map((task) => new TasksEntity(task));
  }

  async findById(id: string): Promise<Task | null> {

    return this.prisma.task.findUnique({
      where: { id },
    });
    
  }

  async create(data: { description: string; completed?: boolean; userId: string }): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async update(id: string, data: { description?: string; completed?: boolean; /*userId?: string*/ }): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}