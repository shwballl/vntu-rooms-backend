import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/users/users.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingService: BookingsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createBooking(@CurrentUser() user: User, @Body() bookingData: any) {
    return await this.bookingService.createBooking(user, bookingData);
  }

  @Get('/my')
  @UseGuards(AuthGuard)
  async getBookings(@CurrentUser() user: User) {
    return await this.bookingService.getBookings(user);
  }

  @Delete(':room_name')
  @UseGuards(AuthGuard)
  async deleteBooking(
    @CurrentUser() user: User,
    @Param('room_name') roomName: string,
  ) {
    return await this.bookingService.deleteBooking(roomName, user);
  }
}
