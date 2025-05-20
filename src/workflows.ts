/* eslint-disable @typescript-eslint/no-unused-vars */
// @@@SNIPSTART slack-summarization-engine-ts-workflow
import { proxyActivities } from '@temporalio/workflow';
import { ApplicationFailure } from '@temporalio/common';

import type * as activities from './activities';
import type { GenerateSummaryDetails } from './shared';

export async function generateSummary(details: GenerateSummaryDetails): Promise<string> {
  const { constructPrompt } = proxyActivities<typeof activities>({
    // RetryPolicy specifies how to automatically handle retries if an Activity fails.
    retry: {
      initialInterval: '1 second',
      maximumInterval: '1 minute',
      backoffCoefficient: 2,
      maximumAttempts: 500,
      nonRetryableErrorTypes: ['PromptConstructionError'],
    },
    startToCloseTimeout: '1 minute',
  });

  let prompt: string;
  try {
    prompt = await constructPrompt(details);
  } catch (promptError) {
    throw new ApplicationFailure(`Failed to construct prompt. Error: ${promptError}`);
  }

  return `Generate summary complete`;
}
// @@@SNIPEND
