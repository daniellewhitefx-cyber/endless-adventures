// TODO: once endlessadventures.ca is transferred to this Cloudflare account
// and attached as a custom domain, redirect the workers.dev URL to it here
// (see fantasy-alive's worker.js for the pattern). Until then, serve the
// site directly off workers.dev as the temporary public URL.
export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
