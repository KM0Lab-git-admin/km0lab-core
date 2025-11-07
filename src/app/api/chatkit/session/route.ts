import { Env } from '@/libs/Env';
import { NextResponse } from 'next/server';

export const POST = async () => {
  if (!Env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY no está configurada' },
      { status: 500 },
    );
  }

  const workflowId = 'wf_690242f67ea48190bea971936acb75c60eb97a7dbf1c529b';
  const version = '3';

  try {
    const requestBody = {
      workflow: {
        id: workflowId,
        version,
      },
      user: `user-${Date.now()}`,
    };

    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'chatkit_beta=v1',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const session = await response.json();

    return NextResponse.json({
      client_secret: session.client_secret,
    });
  }
  catch (error) {
    let errorMessage = 'Error al crear sesión de ChatKit';
    let statusCode = 500;
    let errorDetails: Record<string, unknown> = {};

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = {
        name: error.name,
        message: error.message,
      };
    }
    else if (typeof error === 'object' && error !== null) {
      if ('message' in error) {
        errorMessage = String(error.message);
      }
      if ('status' in error) {
        statusCode = Number(error.status) || 500;
      }
      if ('code' in error) {
        errorDetails.code = error.code;
      }
      errorDetails = { ...error, ...errorDetails };
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
      },
      { status: statusCode },
    );
  }
};
