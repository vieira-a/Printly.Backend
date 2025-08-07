import { CreateModelInput } from './input/create-model.input';
import { ModelOutput } from './output/model.output';

export interface ICreateModelUseCase {
  execute(input: CreateModelInput): Promise<ModelOutput>;
}
