import { Request, Response } from 'express';
import Config from 'config';
import { EmailService } from 'services/email';
import { SmsService } from 'services/twilio';
import { IntItem } from 'common/interfaces/products';
import { cartAPI } from 'api/cart';
import { isEmpty } from 'utils/others';
import { CartIsEmpty } from 'errors';

interface User {
  name?: string;
  email: string;
  telephone: string;
}

export const sendOrder = async (req: Request, res: Response): Promise<void> => {
  const { email, name, telephone } = req.user as User;
  const products = (await cartAPI.get(email)) as IntItem[];

  if (!isEmpty(products)) {
    let emailContent = '<h2>Products</h2>';

    const total = products.reduce((total, item) => (total += item.price), 0);
    products.forEach(item => {
      emailContent += `
          <span style="display: block">- ${item.name}, ${item.code}, $${item.price} </span>
          `;
    });

    emailContent += `<h3>Total: $${total.toFixed(2)}</h3>`;

    EmailService.sendEmail(
      Config.GMAIL_EMAIL,
      `New order from: ${name}, ${email}`,
      emailContent,
    );

    SmsService.sendMessage(
      Config.ADMIN_WHATSAPP,
      `New order from: ${name}, ${email}`,
      'whatsapp',
    );

    SmsService.sendMessage(
      telephone,
      `Your order has been taken and it's being processed`,
      'sms',
    );

    await cartAPI.delete(email);

    res.json({ data: 'Order sent successfully' });
  } else {
    throw new CartIsEmpty(404, 'Cart is empty!');
  }
};
