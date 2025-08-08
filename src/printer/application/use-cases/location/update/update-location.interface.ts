import { UpdateLocationInput } from './input/update-location.input';
import { UpdateLocationOutput } from './output/update-location.output';

export interface IUpdateLocationUseCase {
  execute(id: string, input: UpdateLocationInput): Promise<UpdateLocationOutput>;
}
