import { v4 as uuidv4 } from 'uuid';

import User from '../models/User';

import AppError from '../errors/AppError';

interface PaginatedResult {
  page: number;
  per_page: number;
  pre_page: number | null;
  next_page: number | null;
  total: number;
  total_pages: number;
  users: User[];
}

class UsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUserId = this.users.find(user => user.id === id);
    return findUserId;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUserEmail = this.users.find(user => user.email === email);
    return findUserEmail;
  }

  public async findAll(
    name: string,
    current_page: number,
    per_page_items: number,
  ): Promise<PaginatedResult> {
    const page = current_page || 1;
    const per_page = per_page_items || 10;
    const offset = (page - 1) * per_page;

    const results = name
      ? this.users.filter(user => user.name.includes(name))
      : this.users;

    const paginatedItems = results.slice(offset).slice(0, per_page);

    const total_pages = Math.ceil(results.length / per_page);

    return {
      page,
      per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: results.length,
      total_pages,
      users: paginatedItems,
    };
  }

  public async create(
    name: string,
    email: string,
    pictureUrl: string,
  ): Promise<User> {
    const user = new User();

    const data = {
      id: uuidv4(),
      name,
      email,
      pictureUrl,
      created_at: new Date(),
    };

    Object.assign(user, data);
    this.users.push(user);

    return user;
  }

  public async update(id: string, data: User): Promise<User> {
    const updateUser = this.users.find(user => user.id === id);

    if (!updateUser) {
      throw new AppError('User not found');
    }

    updateUser.name = data.name ?? updateUser.name;
    updateUser.email = data.email ?? updateUser.email;
    updateUser.pictureUrl = data.pictureUrl ?? updateUser.pictureUrl;

    return updateUser;
  }

  public async remove(id: string): Promise<void> {
    const findIndex = this.users.findIndex(findUser => findUser.id === id);

    if (findIndex === -1) {
      throw new AppError('User not found');
    }

    this.users.splice(findIndex, 1);
  }
}

export default UsersRepository;
