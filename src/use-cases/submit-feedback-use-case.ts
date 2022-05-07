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

    if (!comment) {
      throw new Error('Comment is required.');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    if (!type) {
      throw new Error('Type is required.');
    }

    const feedback = await this.feedbacksRepository.create({
      comment,
      screenshot,
      type,
    });

    await this.mailRepository.sendMail({
      subject: 'Novo feedback!',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo de Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot && `<img src="${screenshot}" />`,
        `</div>`,
      ].join('\n'),
    });

    return feedback;
  }
}
