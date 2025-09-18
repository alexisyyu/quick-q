"use server";
import OpenAI from "openai";

const endpoint = process.env.OPENAI_ENDPOINT;
const api_key = process.env.OPENAI_API_KEY;
const deployment_name = "gpt-5-mini";

const client = new OpenAI({
  baseURL: endpoint,
  apiKey: api_key,
});

export async function generateQuestionnaire(description: string) {
  const completion = await client.chat.completions.create({
    messages: [
      {
        role: "developer",
        content: `You are an assistant that generates questionnaire fields based on user descriptions. There are three field types: TextField, NumberField, and SelectField. Each field must have a 'id', 'type' and 'extraAttributes':
    
        - For TextField and NumberField, extraAttributes include: label (string), helperText (string), placeholder (string), and required (boolean).
        - For SelectField, extraAttributes include: label (string), helperText (string), placeholder (string), required (boolean), and options (string[]).
    
        Respond with a JSON array only, where each item is a field object. Example:
        [{ \"id\": \"1\", \"type\": \"TextField\", \"extraAttributes\": { \"label\": \"What is your name?\", \"helperText\": \"\", \"placeholder\": \"Enter your name\", \"required\": true } },
        { \"id\": \"2\", \"type\": \"NumberField\", \"extraAttributes\": { \"label\": \"How old are you?\", \"helperText\": \"\", \"placeholder\": \"Enter your age\", \"required\": false } },
        { \"id\": \"3\", \"type\": \"SelectField\", \"extraAttributes\": { \"label\": \"What's your favorite color?\", \"helperText\": \"\", \"placeholder\": \"Select a color\", \"required\": true, \"options\": [\"Red\", \"Blue\", \"Green\"] } } ]

        Do not include any explanation or extra text—only the JSON array.`,
      },
      { role: "user", content: description },
    ],
    model: deployment_name,
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

export async function generateInsight(formName: string, data: string) {
  const completion = await client.chat.completions.create({
    messages: [
      {
        role: "developer",
        content: `You are an data analyst. Analyze the following data and provide a concise summary of key insights and trends. Respond with a JSON array only, where each item is a string representing an insight or trend. Example:
        ["Insight 1", "Trend 2", "Insight 3"]`,
      },
      {
        role: "user",
        content: `Questionnaire Name: ${formName}\nQuestionnaire Responses: ${data}`,
      },
    ],
    model: deployment_name,
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}
