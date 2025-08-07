import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateModelService } from '../../../application/use-cases/model/create/create-model.service';
import { CreateModelInput } from '../../../application/use-cases/model/create/input/create-model.input';

@Controller('models')
export class ModelController {
  constructor(private readonly createModelService: CreateModelService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() input: CreateModelInput) {
    await this.createModelService.execute(input);
  }
}
