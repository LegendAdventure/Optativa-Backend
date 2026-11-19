import { Injectable } from '@nestjs/common';

@Injectable() //Lógica del negocio
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
