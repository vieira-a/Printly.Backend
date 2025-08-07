import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { CreateModelService } from '../../../application/use-cases/model/create/create-model.service';
import { CreateModelInput } from '../../../application/use-cases/model/create/input/create-model.input';
import { ModelConflictException } from '@printer/application/exceptions/model-conflict.exception';

@Controller('models')
export class ModelController {
  constructor(private readonly createModelService: CreateModelService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreateModelInput) {
    try {
      await this.createModelService.execute(input);
    } catch (error) {
      if (error instanceof ModelConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }
}
