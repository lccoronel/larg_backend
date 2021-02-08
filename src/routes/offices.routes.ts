import { Router } from 'express';
import { getRepository } from 'typeorm';

import Office from '../models/Office';
import CreateOfficeService from '../services/CreateOfficeService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const officesRouter = Router();

officesRouter.use(ensureAuthenticated);

officesRouter.get('/', async (request, response) => {
  const officesRepository = getRepository(Office);

  const offices = await officesRepository.find();

  return response.json(offices);
});

officesRouter.post('/', async (request, response) => {
  try {
    const { name, description, level } = request.body;

    const createOffice = new CreateOfficeService();

    const office = await createOffice.execute({
      name,
      description,
      level,
      created_by: request.user.id,
    });

    return response.json(office);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default officesRouter;
