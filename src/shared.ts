// @@@SNIPSTART slack-summarization-engine-ts-constants
export const namespace = 'default';
export const taskQueueName = process.env.TASK_QUEUE_NAME || 'bookiflow';
// @@@SNIPEND

// @@@SNIPSTART slack-summarization-engine-ts-types

export type GenerateSummaryDetails = {
  user: string;
  ts: string;
  channel: string;
  type: string;
  text: string;
  thread_ts: string;
}

// @@@SNIPEND
