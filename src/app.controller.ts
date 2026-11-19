import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller() //Gestiona/Define las rutas (OJO ESTE SE ENCARGA DE ENVIAR AL main.ts y de ahí al Frontend)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello(); //Controller pide a Service que le de los datos ya arreglados y los devuelve
  }
}
