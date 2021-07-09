import { Request, Response } from 'express';

import UsersRepository from '../repositories/UsersRepository';

import AppError from '../errors/AppError';

const usersRepository = new UsersRepository();

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, pictureUrl } = request.body;

    // const userExits = await usersRepository.findByEmail(email);

    // if (userExits) {
    //   throw new AppError('E-mail already exists');
    // }

    const user = await usersRepository.create(name, email, pictureUrl);

    return response.json(user);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page);
    const per_page = Number(request.query.per_page);
    const { name } = request.query;

    const users = await usersRepository.findAll(name as string, page, per_page);

    return response.json(users);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const user = await usersRepository.findById(id);

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const user = request.body;

    const updatedUser = await usersRepository.update(id, user);

    return response.json(updatedUser);
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await usersRepository.remove(id);

    return response.json();
  }
}

export default UsersController;
