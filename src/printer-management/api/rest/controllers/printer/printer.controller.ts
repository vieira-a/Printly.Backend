import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  InstallationLocationNotFoundException,
  ModelNotFoundException,
  PrinterConflictException,
  PrinterNotFoundException,
} from '@printer/application/exceptions';
import { CreatePrinterService } from '@printer/application/use-cases/printer/create/create-printer.service';
import { CreatePrinterInput } from '@printer/application/use-cases/printer/create/input/create-printer.input';
import { UpdatePrinterInput } from '@printer/application/use-cases/printer/update/input/update-printer.input';
import { CreateManualCountingService } from '@printer/application/use-cases/counting/manual-counting/create/create-manual-counting.service';
import { UpdatePrinterService } from '@printer/application/use-cases/printer/update/update-printer.service';
import { FindPrinterService } from '@printer/application/use-cases/printer/find/find-printer.service';

@Controller('printers')
export class PrinterController {
  constructor(
    private readonly createPrinterService: CreatePrinterService,
    private readonly updatePrinterService: UpdatePrinterService,
    private readonly createManualCountingService: CreateManualCountingService,
    private readonly findPrinterService: FindPrinterService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreatePrinterInput) {
    try {
      return await this.createPrinterService.execute(input);
    } catch (error: unknown) {
      if (error instanceof ModelNotFoundException) throw new NotFoundException(error.message);
      if (error instanceof InstallationLocationNotFoundException) throw new NotFoundException(error.message);
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

  @HttpCode(HttpStatus.OK)
  @Put(':id/counting')
  async updateCounting(@Param('id') id: string, @Body() input: { totalPrint: number; totalCopy: number }) {
    try {
      const { totalPrint, totalCopy } = input;
      return await this.createManualCountingService.execute(id, totalPrint, totalCopy);
    } catch (error) {
      if (error instanceof PrinterNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll() {
    try {
      return await this.findPrinterService.execute();
    } catch (error: unknown) {
      if (error instanceof Error) throw error;
    }
  }
}
