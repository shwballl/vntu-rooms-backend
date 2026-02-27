import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('rooms')
export class RoomsController {
  constructor(private roomService: RoomsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getRooms() {
    return await this.roomService.getRooms();
  }

  @UseGuards(AuthGuard)
  @Get(':name')
  async getRoomSchedule(@Param('name') name: string) {
    return await this.roomService.getRoomSchedule(name);
  }
}
