import { Router } from 'express';

import { NodemailerMailRepository } from './repositories/nodemailer/nodemailer-mail-repository';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = Router();

routes.post('/feedbacks', async (req, res) => {
  const { comment, screenshot, type } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const nodemailerMailRepository = new NodemailerMailRepository();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailRepository,
  );

  const feedback = await submitFeedbackUseCase.execute({
    comment,
    screenshot,
    type,
  });

  return res.status(201).json({ data: feedback });
});
