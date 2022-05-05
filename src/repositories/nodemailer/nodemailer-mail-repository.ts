import { createTransport } from 'nodemailer';

import { MailRepository, SendMailData } from '../mail-repository';

const transport = createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '39a5244c983885',
    pass: 'a028afca813c38',
  },
});

export class NodemailerMailRepository implements MailRepository {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Thales Loreto <tloreto.dev@gmail.com>',
      subject: subject,
      html: body,
    });
  }
}
