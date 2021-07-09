import request from 'supertest';
import app from '../../app';

const USER_ROUTE = '/users';

describe('User', () => {
  describe('Create User', () => {
    test('Should be able to create a new user', async () => {
      const createUser = await request(app).post(USER_ROUTE).send({
        name: 'newUser1',
        email: 'user1@email.com',
        pictureUrl:
          'https://image.shutterstock.com/image-photo/closeup-photo-amazing-short-hairdo-600w-1617540484.jpg',
      });
      expect(createUser.status).toBe(200);
      expect(createUser.body).toHaveProperty('id');
      expect(createUser.body.name).toBe('newUser1');
      expect(createUser.body.email).toBe('user1@email.com');
      expect(createUser.body.pictureUrl).toBe(
        'https://image.shutterstock.com/image-photo/closeup-photo-amazing-short-hairdo-600w-1617540484.jpg',
      );
    });
  });

  describe('List All Users', () => {
    test('Should be able to list all users', async () => {
      const listUsers = await request(app).get(USER_ROUTE);
      expect(listUsers.status).toBe(200);
      expect(listUsers.body.data.length).toBeGreaterThan(0);
    });

    test('Should be able to list all users when the item limit per page is entered', async () => {
      await request(app).post(USER_ROUTE).send({
        name: 'newUser2',
        email: 'user2@email.com',
        pictureUrl:
          'https://image.shutterstock.com/image-photo/happy-young-indian-woman-blogger-600w-1606121245.jpg',
      });
      await request(app).post(USER_ROUTE).send({
        name: 'newUser3',
        email: 'user3@email.com',
        pictureUrl:
          'https://image.shutterstock.com/image-photo/handsome-unshaven-young-darkskinned-male-600w-640011838.jpg',
      });
      await request(app).post(USER_ROUTE).send({
        name: 'newUser4',
        email: 'user4@email.com',
        pictureUrl:
          'https://image.shutterstock.com/image-photo/smiling-bearded-young-male-model-600w-788313199.jpg',
      });

      const listUsers = await request(app).get(`${USER_ROUTE}?per_page=4`);
      expect(listUsers.status).toBe(200);
      expect(listUsers.body.page).toBe(1);
      expect(listUsers.body.per_page).toBe(4);
      expect(listUsers.body.data.length).toBe(4);
    });

    test('Should be able to list all users when current page and item limit per page are entered', async () => {
      const listUsers = await request(app).get(
        `${USER_ROUTE}?page=2&per_page=2`,
      );
      expect(listUsers.status).toBe(200);
      expect(listUsers.body.page).toBe(2);
      expect(listUsers.body.per_page).toBe(2);
      expect(listUsers.body.pre_page).toBe(1);
      expect(listUsers.body.next_page).toBe(null);
      expect(listUsers.body.total).toBe(4);
      expect(listUsers.body.total_pages).toBe(2);
      expect(listUsers.body.data.length).toBe(2);
    });
  });

  describe('Show User', () => {
    test('Should be able to show a user details', async () => {
      const createUser = await request(app).post(USER_ROUTE).send({
        name: 'newUser5',
        email: 'user5@email.com',
        pictureUrl:
          'https://image.shutterstock.com/image-photo/image-excited-screaming-young-woman-600w-1036253818.jpg',
      });
      expect(createUser.status).toBe(200);

      const showUser = await request(app).get(
        `${USER_ROUTE}/${createUser.body.id}`,
      );
      expect(showUser.status).toBe(200);
      expect(showUser.body).toHaveProperty('id');
      expect(showUser.body.name).toBe('newUser5');
      expect(showUser.body.email).toBe('user5@email.com');
      expect(showUser.body.pictureUrl).toBe(
        'https://image.shutterstock.com/image-photo/image-excited-screaming-young-woman-600w-1036253818.jpg',
      );
      expect(showUser.body).toHaveProperty('created_at');
    });
  });

  describe('Update User', () => {
    test('Should be able to update a user', async () => {
      const createUser = await request(app).post(USER_ROUTE).send({
        name: 'newUser6',
        email: 'user6@email.com',
        pictureUrl:
          'https://image.shutterstock.com/image-photo/image-excited-screaming-young-woman-600w-1036253818.jpg',
      });
      expect(createUser.status).toBe(200);

      const updateUser = await request(app)
        .put(`${USER_ROUTE}/${createUser.body.id}`)
        .send({
          name: 'Updated newUser6',
          email: 'updated_user6@email.com',
          pictureUrl:
            'https://image.shutterstock.com/image-photo/grandmother-portrait-set-studio-concepts-600w-797669914.jpg',
        });
      expect(updateUser.status).toBe(200);
      expect(updateUser.body).toHaveProperty('id');
      expect(updateUser.body.name).toBe('Updated newUser6');
      expect(updateUser.body.email).toBe('updated_user6@email.com');
      expect(updateUser.body.pictureUrl).toBe(
        'https://image.shutterstock.com/image-photo/grandmother-portrait-set-studio-concepts-600w-797669914.jpg',
      );
      expect(updateUser.body).toHaveProperty('created_at');
    });
  });

  describe('Delete User', () => {
    test('Should be able to delete a user', async () => {
      const createUser = await request(app).post(USER_ROUTE).send({
        name: 'newUser7',
        email: 'user7@email.com',
        pictureUrl:
          'https://image.shutterstock.com/image-photo/image-excited-screaming-young-woman-600w-1036253818.jpg',
      });
      expect(createUser.status).toBe(200);

      const deleteUser = await request(app).delete(
        `${USER_ROUTE}/${createUser.body.id}`,
      );

      expect(deleteUser.status).toBe(200);
    });
  });
});
