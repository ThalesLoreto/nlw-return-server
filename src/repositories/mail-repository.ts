export interface SendMailData {
  body: string;
  subject: string;
}

export interface MailRepository {
  sendMail: (data: SendMailData) => Promise<void>;
}
