import { ConversationsRepliesResponse } from '@slack/web-api';
import { MessageElement } from '@slack/web-api/dist/response/ConversationsRepliesResponse';

export class PromptConstructionError extends Error {
  constructor(reason: string) {
    super(`Failed to construct prompt. Reason=${reason}`);
  }
}

export async function getSummarizationPrompt(params: ConversationsRepliesResponse): Promise<string> {
    const allReplies: MessageElement[] = [];

    function extractValidMessages(response: ConversationsRepliesResponse): MessageElement[] {
        if (!response.ok) {
            console.warn('API Error:', response.error);
            return [];
        }

        const messages = response.messages || [];
        return messages.filter((msg) => {
            if (!msg || !msg.user || !msg.text) {
                console.warn('Skipping invalid message:', msg);
                return false;
            }
            return true;
        });        
    }

    allReplies.push(...extractValidMessages(params));

    if (allReplies.length === 0) {
        throw new PromptConstructionError('failed to get message replies');
    }

    const textReplies: string[] = allReplies.map(msg => `${msg.user}: ${msg.text}`);

    const prompt = `
    You are given a conversation from Slack where each line starts with the sender's name followed by their message. 
    Your task is to generate a concise and clear summary of the entire conversation, capturing the main points and outcomes in natural, plain language.
    Do not list every message individually.
    Focus on the key ideas, decisions, questions, and answers.
    Mention participants only if necessary for clarity.
    Keep your summary under 5 sentences unless the conversation is especially long or complex.
    Here is the conversation:
    ${textReplies.join('\n')}
    `.trim();
    console.log(`prompt=${prompt}`);

    return prompt;
}