/*
 |--------------------------------------------------------------------------
 | Browser-sync config file http://www.browsersync.io/docs/options/
 |--------------------------------------------------------------------------
 */
module.exports = {
  snippetOptions: {
    rule: {
      match: /<\/head>/i,
      fn: function(snippet, match) {
        return snippet + match
      },
    },
  },
  reloadDelay: 1000,
  files: ["./content/**.*", "./static/dist/**/*.*", "./layouts/**.*"],
  proxy: {
    target: "localhost:1313", // can be [virtual host, sub-directory, localhost with port]
    ws: true, // enables websockets
  },
}
