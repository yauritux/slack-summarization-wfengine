// @@@SNIPSTART slack-summarization-engine-ts-client
import { Connection, WorkflowClient } from '@temporalio/client';
import { generateSummary } from './workflows';

import { namespace, taskQueueName } from './shared';

async function run() {
  const connection = await Connection.connect();
  const client = new WorkflowClient({ connection, namespace });

  const details = {
    user: 'yauri',
    ts: new Date().toTimeString(),
    channel: 'bookipi-bot-testing',
    type: 'app_mention',
    text: '@bookipi-test summarize this thread',
    thread_ts: new Date().toTimeString(),
  };

  console.log(`Starting generate summary workflow for ${JSON.stringify(details, null, 2)}`);

  const handle = await client.start(generateSummary, {
    args: [details],
    taskQueue: taskQueueName,
    workflowId: `generate-summary-${details.channel}-${details.user}`,
  });

  console.log(
    `Started workflow generate summary with RunID ${handle.firstExecutionRunId}`
  );

  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
