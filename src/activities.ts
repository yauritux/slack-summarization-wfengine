import type { GenerateSummaryDetails } from './shared';
import { retrieveConversationReplies } from './slack';
import { getSummarizationPrompt, PromptConstructionError } from './ai-summarizer';
import { ConversationsRepliesResponse } from '@slack/web-api';

// @@@SNIPSTART slack-summarization-engine-ts-construct-prompt-activity
export async function constructPrompt(details: GenerateSummaryDetails): Promise<string> {
  console.log(
    `Constructing prompt for ${details.user} on ${details.channel}.\n\n`
  );

  try {
    const replies = await retrieveConversationReplies({
      channel: details.channel,
      ts: details.thread_ts ? details.thread_ts : details.ts,
      include_all_metadata: true
    });    
    return await getSummarizationPrompt(replies);    
  } catch (error) {    
    throw new PromptConstructionError(`Failed to construct prompt.Reason: ${error}`);
  }  
}
// @@@SNIPEND
