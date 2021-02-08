import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import UserRepository from '../repositories/UsersRepository';

interface Request {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  phone: string;
  street: string;
  homeNumber: string;
  neighborhood: string;
  zipCode: string;
  office_id: string;
}

class RegisterNewUserService {
  public async execute({
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
    password,
  }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const findEmailAlreadyExists = await usersRepository.findByEmail(email);

    if (findEmailAlreadyExists) {
      throw Error('This user is already exists');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
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
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default RegisterNewUserService;
