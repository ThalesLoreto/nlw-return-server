import { Feedback as FeedbackModel } from '@prisma/client';

export interface FeedbackCreateData {
  comment: string;
  screenshot?: string;
  type: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<FeedbackModel>;
}
