import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { User } from './entities//user.entity.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return User.fromPrisma(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(User.fromPrisma);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? User.fromPrisma(user) : null;
  }

  async findByLogin(login: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { login } });
    return user ? User.fromPrisma(user) : null;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await this.prisma.user.update({ where: { id }, data });
    return User.fromPrisma(user);
  }

  async delete(id: string): Promise<User> {
    const user = await this.prisma.user.delete({ where: { id } });
    return User.fromPrisma(user);
  }
}