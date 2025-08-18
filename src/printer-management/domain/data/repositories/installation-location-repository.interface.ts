import { InstallationLocation } from '@printer/domain/entities';

export interface IInstallationLocationRepository {
  create(input: InstallationLocation): Promise<InstallationLocation>;
  existsById(id: string): Promise<boolean>;
  findById(id: string): Promise<InstallationLocation | null>;
  update(input: InstallationLocation): Promise<InstallationLocation | null>;
}
