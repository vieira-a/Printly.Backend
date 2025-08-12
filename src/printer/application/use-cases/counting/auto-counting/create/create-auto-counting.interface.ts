export interface ICreateAutoCountingUseCase {
  execute(id: string): Promise<void>;
}
