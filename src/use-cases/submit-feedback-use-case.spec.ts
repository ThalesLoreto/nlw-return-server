import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

let submitFeedback: SubmitFeedbackUseCase;

describe('Submit Feedback', () => {
  beforeAll(() => {
    submitFeedback = new SubmitFeedbackUseCase(
      { create: createFeedbackSpy },
      { sendMail: sendMailSpy },
    );
  });

  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        comment: 'comment test message',
        type: 'BUG',
        screenshot: 'data:image/png;base64,30urnf383f08nqflk101',
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without a comment', async () => {
    await expect(
      submitFeedback.execute({
        comment: '',
        type: 'BUG',
        screenshot: 'data:image/png;base64,30urnf383f08nqflk101',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without a type', async () => {
    await expect(
      submitFeedback.execute({
        comment: 'comment test message',
        type: '',
        screenshot: 'data:image/png;base64,30urnf383f08nqflk101',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with a invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        comment: 'comment test message',
        type: 'BUG',
        screenshot: 'test.png',
      }),
    ).rejects.toThrow();
  });
});
