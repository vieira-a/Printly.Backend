import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import {
  LocationNotFoundException,
  ModelNotFoundException,
  PrinterConflictException,
} from '@printer/application/exceptions';
import { CreatePrinterService } from '@printer/application/use-cases/printer/create/create-printer.service';
import { CreatePrinterInput } from '@printer/application/use-cases/printer/create/input/create-printer.input';

@Controller('printers')
export class PrinterController {
  constructor(private readonly createPrinterService: CreatePrinterService) {}

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
}
