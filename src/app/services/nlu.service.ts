import { Injectable } from '@angular/core';
import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1';
import { IamAuthenticator } from 'ibm-watson/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NLUService {
  private nlu: NaturalLanguageUnderstandingV1;

  constructor() {
    this.nlu = new NaturalLanguageUnderstandingV1({
      version: '2022-04-07',
      authenticator: new IamAuthenticator({
        apikey: environment.watsonNluApiKey,
      }),
      serviceUrl: environment.watsonNluUrl,
    });
  }

  // ... rest of the service remains the same
}