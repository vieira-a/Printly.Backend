import { Body, Controller, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { InstallationLocationNotFoundException } from '@printer/application/exceptions/installation-location-not-found.exception';
import { CreateInstallationLocationService } from '@printer/application/use-cases/location/create/create-installation-location.service';
import { CreateInstallationLocationInput } from '@printer/application/use-cases/location/create/input/create-location.input';
import { UpdateInstallationLocationInput } from '@printer/application/use-cases/location/update/input/update-installation-location.input';
import { UpdateInstallationLocationService } from '@printer/application/use-cases/location/update/update-installation-location.service';

@Controller('locations')
export class LocationController {
  constructor(
    private readonly createInstallationLocationService: CreateInstallationLocationService,
    private readonly updateInstallationLocationService: UpdateInstallationLocationService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreateInstallationLocationInput) {
    try {
      return await this.createInstallationLocationService.execute(input);
    } catch (error: unknown) {
      if (error instanceof Error) throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() input: UpdateInstallationLocationInput) {
    try {
      return await this.updateInstallationLocationService.execute(id, input);
    } catch (error) {
      if (error instanceof InstallationLocationNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
