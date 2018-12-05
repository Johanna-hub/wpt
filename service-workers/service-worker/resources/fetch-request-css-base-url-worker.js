let source;
let resolveDone;
let done = new Promise(resolve => resolveDone = resolve);

self.addEventListener('message', event => {
  source = event.data.port;
  source.postMessage('pong');
  event.waitUntil(done);
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // For the CSS file, respond in a way that may change the response URL,
  // depending on |url.search|.
  const cssPath = 'request-url-path/fetch-request-css-base-url-style.css';
  if (url.pathname.indexOf(cssPath) != -1) {
    // Respond with a different URL, deleting "request-url-path/".
    if (url.search == '?fetch') {
      event.respondWith(fetch('fetch-request-css-base-url-style.css'));
    }
    // Respond with new Response().
    else if (url.search == '?newResponse') {
      const styleString = 'body { background-image: url("./dummy.png");}';
      const headers = {'content-type': 'text/css'};
      event.respondWith(new Response(styleString, headers));
    }
  }

  // The image request indicates what the base URL of the CSS was. Message the
  // result back to the test page.
  else if (url.pathname.indexOf('dummy.png') != -1) {
    source.postMessage({
      url: event.request.url,
      referrer: event.request.referrer
    });
    resolveDone();
  }
});
