import { UpdateInstallationLocationInput } from './input/update-installation-location.input';
import { UpdateInstallationLocationOutput } from './output/update-installation-location.output';

export interface IUpdateInstallationLocationUseCase {
  execute(id: string, input: UpdateInstallationLocationInput): Promise<UpdateInstallationLocationOutput | null>;
}
