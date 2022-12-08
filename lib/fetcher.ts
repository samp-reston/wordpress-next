const WP_API: URL = process.env.WP_URL;

async function fetcher(query: any, {variables}: any) {
  const res = await fetch(WP_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export default fetcher;