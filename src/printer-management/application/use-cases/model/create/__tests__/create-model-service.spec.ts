import { Test, TestingModule } from '@nestjs/testing';
import { IPrinterModelRepository } from '@printer/domain/data/repositories';
import { CreatePrinterModelService } from '../create-printer-model.service';
import { CreatePrinterModelInput } from '../input/create-printer-model.input';
import { PrinterModel } from '@printer/domain/entities';
import { ModelDomainValidationException } from '@printer/domain/exceptions';
import { ModelConflictException } from '@printer/application/exceptions';

describe('CreateModelService', () => {
  let service: CreatePrinterModelService;
  let printerModelMockedRepository: jest.Mocked<IPrinterModelRepository>;

  beforeEach(async () => {
    printerModelMockedRepository = {
      create: jest.fn(),
      existsById: jest.fn(),
      existsByManufacturerAndDesciption: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePrinterModelService,
        {
          provide: 'IPrinterModelRepository',
          useValue: printerModelMockedRepository,
        },
      ],
    }).compile();

    service = module.get<CreatePrinterModelService>(CreatePrinterModelService);
  });

  it('should call printerModelRepository.create with a valid model', async () => {
    const input: CreatePrinterModelInput = {
      manufacturer: 'Kyocera',
      description: 'M2040DN',
      printOid: '1.2.3.4.5.6.7.8.9.10',
      copyOid: '1.2.3.4.5.6.7.8.9.11',
    };

    const createdModel = PrinterModel.create({ ...input });
    const spyCreate = jest.spyOn(printerModelMockedRepository, 'create').mockResolvedValue(createdModel);
    const result = await service.execute(input);

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(result.manufacturer).toBe(input.manufacturer);
    expect(result.description).toBe(input.description);
    expect(result.printOid).toBe(input.printOid);
    expect(result.copyOid).toBe(input.copyOid);
  });

  it('should throw ModelDomainValidationException if model creation fails', () => {
    const invalidInput: CreatePrinterModelInput = {
      manufacturer: '',
      description: '',
      printOid: '',
      copyOid: '',
    };

    expect(() => PrinterModel.create({ ...invalidInput })).toThrow(ModelDomainValidationException);
    expect(jest.spyOn(printerModelMockedRepository, 'create')).not.toHaveBeenCalled();
  });

  it('should throw ModelConflictException if model with manufacturer and description already exists', async () => {
    const input: CreatePrinterModelInput = {
      manufacturer: 'Kyocera',
      description: 'M2040DN',
      printOid: '1.2.3.4.5.6.7.8.9.10',
      copyOid: '1.2.3.4.5.6.7.8.9.11',
    };

    jest.spyOn(printerModelMockedRepository, 'existsByManufacturerAndDesciption').mockResolvedValue(true);
    await expect(service.execute(input)).rejects.toThrow(ModelConflictException);
    expect(jest.spyOn(printerModelMockedRepository, 'create')).not.toHaveBeenCalled();
  });
});
