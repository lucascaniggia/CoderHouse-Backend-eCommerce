import { Request, Response } from 'express';
import Config from 'config';
import { EmailService } from 'services/email';
import { CartIntItem } from '/common/interfaces/cart';
import { cartAPI } from 'api/cart';
import { isEmpty, isProductPopulated } from 'utils/others';
import { CartIsEmpty } from 'errors';

interface User {
  _id: string;
  name?: string;
  email: string;
  telephone: string;
}

export const sendOrder = async (req: Request, res: Response): Promise<void> => {
  const { _id, email, name } = req.user as User;
  const products = (await cartAPI.get(_id)) as CartIntItem[];

  if (!isEmpty(products)) {
    let emailContent = '<h2>Products</h2>';

    const total = products.reduce((total, item) => {
      if (isProductPopulated(item.product))
        return (total += item.product.price * item.quantity);
      else return total;
    }, 0);
    products.forEach(item => {
      if (isProductPopulated(item.product))
        emailContent += `
          <span style="display: block">- ${item.quantity} ${item.product.name}, ${item.product.code}, $${item.product.price} </span>
          `;
    });

    emailContent += `<h3>Total: $${total.toFixed(2)}</h3>`;

    EmailService.sendEmail(
      Config.GMAIL_EMAIL,
      `New order from: ${name}, ${email}`,
      emailContent,
    );

    // SmsService.sendMessage(
    //   Config.ADMIN_WHATSAPP,
    //   `New order from: ${name}, ${email}`,
    //   'whatsapp',
    // );

    // SmsService.sendMessage(
    //   telephone,
    //   `Your order has been taken successfully and is being processed.`,
    //   'sms',
    // );

    await cartAPI.delete(_id);

    res.json({ data: 'Order sent successfully' });
  } else {
    throw new CartIsEmpty(404, 'Cart is empty!');
  }
};
