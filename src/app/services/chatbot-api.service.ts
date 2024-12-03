import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment.development';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ChatbotApiService {

  form: FormGroup;
  generateAi = new GoogleGenerativeAI(environment.API_KEY);
  model = this.generateAi.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });
  

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      userInput: ['']
    });
  }
async generate(textInput: string): Promise<string> {
  try {
    if (textInput) {
      const prompt = textInput;

      const parts = [
        { text: prompt },
        { text: textInput }
      ];

      const modelResult = await this.model.generateContent({
        contents: [{ role: 'user', parts }],
      });

      const response = modelResult.response;
      return response.text(); 
    }
  } catch (e: any) {
    console.error('Error en la generación de contenido:', e);
  }
  return ''; 
}
}