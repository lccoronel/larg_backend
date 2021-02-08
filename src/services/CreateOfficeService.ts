import { getRepository } from 'typeorm';

import Office from '../models/Office';

interface Request {
  name: string;
  description: string;
  level: number;
  created_by: string;
}

class CreateOfficeService {
  public async execute({
    name,
    description,
    level,
    created_by,
  }: Request): Promise<Office> {
    const officesRepository = getRepository(Office);

    const checkOfficeExists = await officesRepository.findOne({
      where: { name },
    });

    if (checkOfficeExists) {
      throw new Error('Office already used.');
    }

    const office = officesRepository.create({
      name,
      description,
      level,
      created_by,
    });

    await officesRepository.save(office);

    return office;
  }
}

export default CreateOfficeService;
