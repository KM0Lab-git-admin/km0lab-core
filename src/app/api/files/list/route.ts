import { Env } from '@/libs/Env';
import { NextResponse } from 'next/server';

export const GET = async () => {
  if (!Env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY no está configurada' },
      { status: 500 },
    );
  }

  try {
    const response = await fetch('https://api.openai.com/v1/files', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${Env.OPENAI_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  }
  catch (error) {
    let errorMessage = 'Error al listar archivos';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
};

