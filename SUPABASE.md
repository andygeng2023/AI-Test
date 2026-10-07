# Vireonix + GitHub Pages

The GitHub Pages frontend cannot reliably call Vireonix directly when the browser blocks the cross-origin request. This repo includes a Supabase Edge Function that acts as a small server-side proxy.

## Deploy the function

From the repository root:

```bash
supabase functions deploy vireonix-chat
```

The function URL will be:

```
https://YOUR_PROJECT_REF.supabase.co/functions/v1/vireonix-chat
```

No Vireonix API key is required.

## Configure the GitHub Pages frontend

Edit `index.html` and replace `YOUR_PROJECT_REF` in `VIREONIX_API` with your Supabase project reference.

Do not put a Supabase service-role key in `index.html` or any other GitHub Pages file.
