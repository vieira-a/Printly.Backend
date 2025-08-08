import { CreateLocationInput } from './input/create-location.input';
import { CreateLocationOutput } from './output/create-location.output';

export interface ICreateLocationUseCase {
  execute(input: CreateLocationInput): Promise<CreateLocationOutput>;
}
