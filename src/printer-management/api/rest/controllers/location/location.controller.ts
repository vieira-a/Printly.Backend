import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LocationNotFoundException } from '@printer/application/exceptions/location-not-found.exception';
import { CreateLocationService } from '@printer/application/use-cases/location/create/create-location.service';
import { CreateLocationInput } from '@printer/application/use-cases/location/create/input/create-location.input';
import { UpdateLocationInput } from '@printer/application/use-cases/location/update/input/update-location.input';
import { UpdateLocationService } from '@printer/application/use-cases/location/update/update-location.service';

@Controller('locations')
export class LocationController {
  constructor(
    private readonly createLocationService: CreateLocationService,
    private readonly updateLocationService: UpdateLocationService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreateLocationInput) {
    try {
      return await this.createLocationService.execute(input);
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() input: UpdateLocationInput) {
    try {
      return await this.updateLocationService.execute(id, input);
    } catch (error) {
      if (error instanceof LocationNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
