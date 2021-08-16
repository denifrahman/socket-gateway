import { Controller, Get, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService
    ) {}

  @MessagePattern({ cmd: 'sum' })
  getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {

    console.log(data)
  }
}
