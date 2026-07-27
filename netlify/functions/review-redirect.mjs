const destinations = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
  10: null,
  11: null,
  12: null,
  13: null,
  14: null,
  15: null,
  16: null,
  17: null,
  18: null,
  19: null,
  20: null,
};

export default async (request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") ?? url.pathname.split("/").filter(Boolean).at(-1);

  if (!Object.hasOwn(destinations, id)) {
    return new Response("Not found", { status: 404 });
  }

  const destination = destinations[id];

  if (!destination) {
    return new Response(null, {
      status: 204,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return Response.redirect(destination, 302);
};
