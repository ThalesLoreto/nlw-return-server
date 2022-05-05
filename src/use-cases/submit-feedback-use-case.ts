import { FeedbacksRepository } from '../repositories/feedbacks-repository';
import { MailRepository } from '../repositories/mail-repository';

interface SubmitFeedbackUseCaseRequest {
  comment: string;
  screenshot?: string;
  type: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly mailRepository: MailRepository,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { comment, screenshot, type } = request;

    const feedback = await this.feedbacksRepository.create({
      comment,
      screenshot,
      type,
    });

    await this.mailRepository.sendMail({
      subject: 'Novo Feedback!',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    });

    return feedback;
  }
}
