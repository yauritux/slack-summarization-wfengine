// @@@SNIPSTART slack-summarization-engine-ts-worker
import { Worker } from '@temporalio/worker';
import * as activities from './activities';
import { namespace, taskQueueName } from './shared';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    namespace,
    taskQueue: process.env.TASK_QUEUE_NAME || 'bookiflow',
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
