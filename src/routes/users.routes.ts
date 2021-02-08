import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersRepository from '../repositories/UsersRepository';
import RegisterNewUserService from '../services/RegisterNewUserService';

const usersRouter = Router();

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      phone,
      street,
      homeNumber,
      neighborhood,
      zipCode,
      office_id,
    } = request.body;

    const registerNewUser = new RegisterNewUserService();

    const user = await registerNewUser.execute({
      firstName,
      lastName,
      email,
      birthDate,
      phone,
      street,
      homeNumber,
      neighborhood,
      zipCode,
      office_id,
      password: `${firstName}123`,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
