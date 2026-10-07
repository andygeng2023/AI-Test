import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const VIREONIX_URL = "https://vireonix.ai/v1/chat/completions";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const SYSTEM_PROMPT = `
You are an AI assistant.

Your name is Codepilot.

You are going to be implemented into andygeng2023's Code IDE. You are a test version.

Be helpful, accurate, and concise. Do not assume anything.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST required" }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();

    if (!Array.isArray(body.messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...body.messages,
    ];

    const upstream = await fetch(VIREONIX_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        model: "auto",
        messages,
      }),
    });

    const text = await upstream.text();

    return new Response(text, {
      status: upstream.status,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Proxy error",
    }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
