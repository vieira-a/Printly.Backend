import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateModelService } from '../../../../application/use-cases/model/create/create-model.service';
import { CreateModelInput } from '../../../../application/use-cases/model/create/input/create-model.input';
import { ModelConflictException, ModelNotFoundException } from '@printer/application/exceptions';
import { UpdateModelInput } from '@printer/application/use-cases/model/update/input/update-model.input';
import { UpdateModelService } from '@printer/application/use-cases/model/update/update-model.service';

@Controller('models')
export class ModelController {
  constructor(
    private readonly createModelService: CreateModelService,
    private readonly updateModelService: UpdateModelService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreateModelInput) {
    try {
      return await this.createModelService.execute(input);
    } catch (error) {
      if (error instanceof ModelConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() input: UpdateModelInput) {
    try {
      return await this.updateModelService.execute(id, input);
    } catch (error) {
      if (error instanceof ModelNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
