import { CreateInstallationLocationInput } from './input/create-location.input';
import { CreateInstallationLocationOutput } from './output/create-location.output';

export interface ICreateInstallationLocationUseCase {
  execute(input: CreateInstallationLocationInput): Promise<CreateInstallationLocationOutput>;
}
