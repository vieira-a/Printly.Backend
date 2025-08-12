import { CreateModelInput } from './input/create-model.input';
import { CreateModelOutput } from './output/create-model.output';

export interface ICreateModelUseCase {
  execute(input: CreateModelInput): Promise<CreateModelOutput>;
}
