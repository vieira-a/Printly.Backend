import { Test, TestingModule } from '@nestjs/testing';
import { UnprocessableEntityException } from '@nestjs/common';
import { IModelRepository } from '@printer/domain/repositories/model-repository.interface';
import { CreateModelService } from '../create-model.service';
import { CreateModelInput } from '../input/create-model.input';
import { ModelConflictException } from '@printer/application/exceptions/model-conflict.exception';

describe('CreateModelService', () => {
  let service: CreateModelService;
  let modelMockedRepository: jest.Mocked<IModelRepository>;

  beforeEach(async () => {
    modelMockedRepository = {
      create: jest.fn(),
      findByManufacturerAndDescription: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateModelService,
        {
          provide: 'IModelRepository',
          useValue: modelMockedRepository,
        },
      ],
    }).compile();

    service = module.get<CreateModelService>(CreateModelService);
  });

  it('should call modelRepository.create with a valid model', async () => {
    const input: CreateModelInput = {
      manufacturer: 'Kyocera',
      description: 'M2040DN',
      printOid: '1.2.3.4.5.6.7.8.9.10',
      copyOid: '1.2.3.4.5.6.7.8.9.11',
    };

    await service.execute(input);
    expect(modelMockedRepository.create).toHaveBeenCalled();
    const createdModel = modelMockedRepository.create.mock.calls[0][0];
    expect(createdModel.manufacturer).toBe('Kyocera');
  });

  it('should throw ModelDomainValidationException if model creation fails', async () => {
    const invalidInput: CreateModelInput = {
      manufacturer: '',
      description: '',
      printOid: '',
      copyOid: '',
    };

    await expect(service.execute(invalidInput)).rejects.toThrow(UnprocessableEntityException);
    expect(modelMockedRepository.create).not.toHaveBeenCalled();
  });

  it('should throw ModelConflictException if model with manufacturer and description already exists', async () => {
    const input: CreateModelInput = {
      manufacturer: 'Kyocera',
      description: 'M2040DN',
      printOid: '1.2.3.4.5.6.7.8.9.10',
      copyOid: '1.2.3.4.5.6.7.8.9.11',
    };

    jest.spyOn(modelMockedRepository, 'findByManufacturerAndDescription').mockResolvedValue(true);
    await expect(service.execute(input)).rejects.toThrow(ModelConflictException);
    expect(modelMockedRepository.create).not.toHaveBeenCalled();
  });
});
