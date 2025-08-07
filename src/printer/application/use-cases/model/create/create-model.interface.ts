import { CreateModelInput } from './input/create-model.input';

export interface ICreateModelUseCase {
  execute(input: CreateModelInput): void;
}
