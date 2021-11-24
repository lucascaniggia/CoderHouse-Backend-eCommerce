import { UserModel } from 'models/mongoDb/user';
import { SuperAgentTest } from 'supertest';

export let session: string[];

export const addUserAndLogin = async (
  request: SuperAgentTest,
): Promise<void> => {
  await UserModel.create({
    email: 'test@test.com',
    password: 'secretPassword',
    repeatPassword: 'secretPassword',
    name: 'Test user',
    address: 'Test address',
    age: 31,
    telephone: '+56912345678',
    photo: 'uploads/test-image.jpg',
  });

  await request
    .post('/api/auth/login')
    .send({
      email: 'test@test.com',
      password: 'secretPassword',
    })
    .then(res => {
      session = res.headers['set-cookie'][0]
        .split(/,(?=\S)/)
        .map((item: string) => item.split(';')[0])
        .join(';');
    });
};
