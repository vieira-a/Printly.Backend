import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePrinterModelService } from '../../../../application/use-cases/model/create/create-printer-model.service';
import { CreatePrinterModelInput } from '../../../../application/use-cases/model/create/input/create-printer-model.input';
import { ModelConflictException, ModelNotFoundException } from '@printer/application/exceptions';
import { UpdatePrinterModelInput } from '@printer/application/use-cases/model/update/input/update-printer-model.input';
import { UpdatePrinterModelService } from '@printer/application/use-cases/model/update/update-printer-model.service';

@Controller('models')
export class PrinterModelController {
  constructor(
    private readonly createPrinterModelService: CreatePrinterModelService,
    private readonly updatePrinterModelService: UpdatePrinterModelService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreatePrinterModelInput) {
    try {
      return await this.createPrinterModelService.execute(input);
    } catch (error) {
      if (error instanceof ModelConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() input: UpdatePrinterModelInput) {
    try {
      return await this.updatePrinterModelService.execute(id, input);
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
