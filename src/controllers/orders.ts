import { Request, Response } from 'express';
import Config from 'config';
import { CartModel } from 'models/mongodb/cart';
import { EmailService } from 'services/email';
import { IntItem } from 'common/interfaces';
import { cartAPI } from 'api/cart';

interface User {
  cart?: string;
  name?: string;
  email: string;
}

export const sendOrder = async (req: Request, res: Response): Promise<void> => {
  const { email, name } = req.user as User;
  const products = (await cartAPI.get(email)) as IntItem[];

  let emailContent = '<h2>Products</h2>';

  const total = products.reduce((total, item) => (total += item.price), 0);
  products.forEach(item => {
    emailContent += `
        <span style="display: block">- ${item.name}, ${item.code}, $${item.price} </span>
        `;
  });

  emailContent += `<h3>Total: $${total}</h3>`;

  EmailService.sendEmail(
    Config.GMAIL_EMAIL,
    `New order from: ${name}, ${email}`,
    emailContent,
  );

  await cartAPI.delete(email);

  res.json({ data: 'Your order has been taken successfully' });
};
