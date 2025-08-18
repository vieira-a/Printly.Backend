// import { Test, TestingModule } from '@nestjs/testing';
// import { UnprocessableEntityException } from '@nestjs/common';
// import { IModelRepository } from '@printer/domain/data/repositories';
// import { CreateModelService } from '../create-model.service';
// import { CreateModelInput } from '../input/create-model.input';
// import { ModelConflictException } from '@printer/application/exceptions/model-conflict.exception';
// import { Model } from '@printer/domain/entities';

// describe('CreateModelService', () => {
//   let service: CreateModelService;
//   let modelMockedRepository: jest.Mocked<IModelRepository>;

//   beforeEach(async () => {
//     modelMockedRepository = {
//       create: jest.fn(),
//       existsByManufacturerAndDesciption: jest.fn(),
//       findById: jest.fn(),
//       update: jest.fn(),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CreateModelService,
//         {
//           provide: 'IModelRepository',
//           useValue: modelMockedRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<CreateModelService>(CreateModelService);
//   });

//   it('should call modelRepository.create with a valid model', async () => {
//     const input: CreateModelInput = {
//       manufacturer: 'Kyocera',
//       description: 'M2040DN',
//       printOid: '1.2.3.4.5.6.7.8.9.10',
//       copyOid: '1.2.3.4.5.6.7.8.9.11',
//     };

//     try {
//       const createdModel = Model.restore(
//         '9aef4b3c-40e8-4604-98c4-f8f7e424571e',
//         'Kyocera',
//         'M2040DN',
//         '1.2.3.4.5.6.7.8.9.10',
//         '1.2.3.4.5.6.7.8.9.11',
//         new Date(),
//         new Date(),
//       );

//       modelMockedRepository.create.mockResolvedValue(createdModel);
//     } catch (error) {
//       console.log(error);
//     }

//     await service.execute(input);

//     expect(modelMockedRepository.create).toHaveBeenCalled();
//     const calledModel = modelMockedRepository.create.mock.calls[0][0];
//     expect(calledModel.manufacturer).toBe('Kyocera');
//   });

//   it('should throw ModelDomainValidationException if model creation fails', async () => {
//     const invalidInput: CreateModelInput = {
//       manufacturer: '',
//       description: '',
//       printOid: '',
//       copyOid: '',
//     };

//     await expect(service.execute(invalidInput)).rejects.toThrow(UnprocessableEntityException);
//     expect(modelMockedRepository.create).not.toHaveBeenCalled();
//   });

//   it('should throw ModelConflictException if model with manufacturer and description already exists', async () => {
//     const input: CreateModelInput = {
//       manufacturer: 'Kyocera',
//       description: 'M2040DN',
//       printOid: '1.2.3.4.5.6.7.8.9.10',
//       copyOid: '1.2.3.4.5.6.7.8.9.11',
//     };

//     jest.spyOn(modelMockedRepository, 'existsByManufacturerAndDesciption').mockResolvedValue(true);
//     await expect(service.execute(input)).rejects.toThrow(ModelConflictException);
//     expect(modelMockedRepository.create).not.toHaveBeenCalled();
//   });
// });
