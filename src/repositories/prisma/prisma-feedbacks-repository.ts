import { prisma } from '../../prisma';
import {
  FeedbackCreateData,
  FeedbacksRepository,
} from '../feedbacks-repository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ comment, type, screenshot }: FeedbackCreateData) {
    const feedback = await prisma.feedback.create({
      data: {
        comment,
        screenshot,
        type,
      },
    });

    return feedback;
  }
}
