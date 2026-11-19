import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';
import { TasksRepository } from './tasks.repository.js';
import { UsersModule } from '../users/users.module.js'; // Importamos el módulo de usuarios

@Module({
  imports: [UsersModule], // Lo añadimos al arreglo de imports
  controllers: [TasksController], // Solo controladores aquí
  providers: [TasksService, TasksRepository], // Servicios y repositorios aquí
})
export class TasksModule {}