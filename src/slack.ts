import { App, RespondArguments } from "@slack/bolt";
import axios from "axios";
import {
    ChatDeleteArguments,
    ChatPostMessageArguments,
    ChatUpdateArguments,
    ConversationsRepliesArguments,
} from "@slack/web-api";

import { configDotenv } from "dotenv";

function getSlackApp() {
    configDotenv({path: './src/.env'});

    const slackToken = process.env.SLACK_TOKEN;
    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
    return new App({
        token: slackToken,
        signingSecret: slackSigningSecret,
    });
}

export async function retrieveConversationReplies(params: ConversationsRepliesArguments) {
    const app = getSlackApp();
    return await app.client.conversations.replies(params);
}

export async function postSlackMessage(params: ChatPostMessageArguments) {
    const app = getSlackApp();
    return await app.client.chat.postMessage(params);
}

export async function updateSlackMessage(params: ChatUpdateArguments) {
    const app = getSlackApp();
    return await app.client.chat.update(params);
}

export async function deleteSlackMessage(params: ChatDeleteArguments) {
    const app = getSlackApp();
    return await app.client.chat.delete(params); 
}

export async function respondSlackMessage(
    responseUrl: string,
    params: RespondArguments
): Promise<void> {
    await axios.post(responseUrl, params);
}

export async function getSlackUser(userId: string) {
    const app = getSlackApp();
    return app.client.users.info({
        user: userId,
    });
}