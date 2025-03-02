import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is required.');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    const prompt = `
      You are a native Japanese speaker.
      Your role is to assist users in reviewing and refining Japanese translations.
      Your task is to revise the provided Japanese content to make it more polite and suitable for daily conversations with customers, then explain the changes in Vietnamese.
      Rewrite the following content in a more polite manner, as commonly used when chatting with customers.

      Please provide your response in the following format:
      [
        {
          "role": <fixed string> "assistant",
          "option": <number> "option number",
          "content": <string> "The revised content in Japanese",
          "explain": <string> "The reason for the revision, written in Vietnamese (not Japanese)"
        },
      ]

      Example:
      [
        {
          "role":"assistant",
          "option": 1,
          "content": "こんにちは、お客様。お手伝いできることがあればお気軽にお知らせください。",
          "explain": "Tôi đã chỉnh sửa câu để lịch sự hơn và thân thiện hơn khi giao tiếp với khách hàng."
        },
        {
          "role":"assistant",
          "option": 2,
          "content": "かしこまりました。すぐに対応いたします。",
          "explain": "Tôi đã thay đổi để dùng ngôn ngữ trang trọng hơn, phù hợp với tình huống phục vụ khách hàng."
        },
        {
          "role":"assistant",
          "option": 3,
          "content": "どういたしまして。お役に立てて嬉しいです。",
          "explain": "Tôi đã thêm phần thể hiện sự vui mừng khi giúp đỡ, làm câu trả lời ấm áp và lịch sự hơn."
        }
      ]
        
      ---

      The content to revise:

      ${content}
    `;

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return NextResponse.json({
      response: result.response.text(),
    });
  } catch (error: unknown) {
    console.error(
      'Error generating content:',
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.',
      },
      { status: 500 }
    );
  }
}
