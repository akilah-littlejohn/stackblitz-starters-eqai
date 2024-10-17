import { Injectable } from '@angular/core';
import { AssistantV2 } from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WatsonService {
  private assistant: AssistantV2;

  constructor() {
    this.assistant = new AssistantV2({
      version: '2021-06-14',
      authenticator: new IamAuthenticator({
        apikey: environment.watsonAssistantApiKey,
      }),
      serviceUrl: environment.watsonAssistantUrl,
    });
  }

  async createSession(): Promise<string> {
    const response = await this.assistant.createSession({
      assistantId: environment.watsonAssistantId
    });
    return response.result.session_id;
  }

  async sendMessage(sessionId: string, input: string): Promise<any> {
    const response = await this.assistant.message({
      assistantId: environment.watsonAssistantId,
      sessionId: sessionId,
      input: {
        message_type: 'text',
        text: input
      }
    });
    return response.result;
  }
}