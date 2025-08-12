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
import {
  LocationNotFoundException,
  ModelNotFoundException,
  PrinterConflictException,
  PrinterNotFoundException,
} from '@printer/application/exceptions';
import { CreatePrinterService } from '@printer/application/use-cases/printer/create/create-printer.service';
import { CreatePrinterInput } from '@printer/application/use-cases/printer/create/input/create-printer.input';
import { UpdatePrinterInput } from '@printer/application/use-cases/printer/update/input/update-printer.input';
import { UpdatePrinterService } from '@printer/application/use-cases/printer/update/update-printer.service';

@Controller('printers')
export class PrinterController {
  constructor(
    private readonly createPrinterService: CreatePrinterService,
    private readonly updatePrinterService: UpdatePrinterService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreatePrinterInput) {
    try {
      return await this.createPrinterService.execute(input);
    } catch (error) {
      if (error instanceof ModelNotFoundException) throw new NotFoundException(error.message);
      if (error instanceof LocationNotFoundException) throw new NotFoundException(error.message);
      if (error instanceof PrinterConflictException) throw new ConflictException(error.message);
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() input: UpdatePrinterInput) {
    try {
      return await this.updatePrinterService.execute(id, input);
    } catch (error) {
      if (error instanceof PrinterNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
