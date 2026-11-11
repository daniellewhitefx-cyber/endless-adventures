export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'endless-adventures.daniellewhitefx.workers.dev') {
      url.hostname = 'endlessadventures.ca';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
