export interface IProcessPendingJobUseCase {
  execute(): Promise<void>;
}
