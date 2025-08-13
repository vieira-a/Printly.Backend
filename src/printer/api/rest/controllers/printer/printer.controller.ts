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
  RequestTimeoutException,
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
import { RegisterCountingService } from '@printer/application/use-cases/counting/manual-counting/create/register-counting.service';
import { UpdatePrinterService } from '@printer/application/use-cases/printer/update/update-printer.service';
import { CreateAutoCountingService } from '@printer/application/use-cases/counting/auto-counting/create/create-auto-counting.service';
import { RequestPrinterTimeoutException } from '@shared/exceptions/request-printer-timeout.exception';
import { FindPrinterService } from '@printer/application/use-cases/printer/find/find-printer.service';

@Controller('printers')
export class PrinterController {
  constructor(
    private readonly createPrinterService: CreatePrinterService,
    private readonly updatePrinterService: UpdatePrinterService,
    private readonly registerCountingService: RegisterCountingService,
    private readonly createAutoCountingService: CreateAutoCountingService,
    private readonly findPrinterService: FindPrinterService,
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

  @HttpCode(HttpStatus.OK)
  @Put(':id/counting')
  async updateCounting(
    @Param('id') id: string,
    @Body() input: { totalPrint: number; totalCopy: number },
  ) {
    try {
      const { totalPrint, totalCopy } = input;
      return await this.registerCountingService.execute(id, totalPrint, totalCopy);
    } catch (error) {
      if (error instanceof PrinterNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id/counting/auto')
  async autoCounting(@Param('id') id: string) {
    try {
      return await this.createAutoCountingService.execute(id);
    } catch (error) {
      if (error instanceof PrinterNotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof RequestPrinterTimeoutException) {
        throw new RequestTimeoutException({ message: error.message, ipv4: error.ipv4 });
      }
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll() {
    try {
      return await this.findPrinterService.execute();
    } catch (error) {
      throw error;
    }
  }
}
