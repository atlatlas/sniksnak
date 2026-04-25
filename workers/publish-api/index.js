const REPO = 'atlatas/sniksnak';
const PASSWORD = 'sniksnak';
const TOKEN = '

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { password, filename, content } = await request.json();

      if (password !== PASSWORD) {
        return new Response(JSON.stringify({ error: 'Wrong password' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      if (!filename || !content) {
        return new Response(JSON.stringify({ error: 'Missing filename or content' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      const encoded = btoa(unescape(encodeURIComponent(content)));

      const res = await fetch(
        `https://api.github.com/repos/${REPO}/contents/src/content/articles/${filename}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': 'sniksnak-publish',
          },
          body: JSON.stringify({
            message: `Add article: ${filename}`,
            content: encoded,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        return new Response(JSON.stringify({ error: err.message || 'GitHub API error' }), {
          status: res.status,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  },
};
