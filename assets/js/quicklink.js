import { listen, prefetch } from "quicklink";

listen({
  ignores: [
    /\/api\/?/,
    uri => uri.includes('.zip'),
    uri => uri.includes('.pdf'),
    (uri, elem) => elem.hasAttribute('noprefetch')
  ]
});