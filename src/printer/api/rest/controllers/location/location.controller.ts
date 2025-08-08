import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateLocationService } from '@printer/application/use-cases/location/create/create-location.service';
import { CreateLocationInput } from '@printer/application/use-cases/location/create/input/create-location.input';

@Controller('locations')
export class LocationController {
  constructor(private readonly createLocationService: CreateLocationService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreateLocationInput) {
    try {
      return await this.createLocationService.execute(input);
    } catch (error) {
      throw error;
    }
  }
}
