import { UpdateModelInput } from './input/update-model.input';
import { UpdateModelOutput } from './output/update-model.output';

export interface IUpdateModelUseCase {
  execute(id: string, input: UpdateModelInput): Promise<UpdateModelOutput | null>;
}
