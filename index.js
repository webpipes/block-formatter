var mustache = require('mustache');
var webpipes = require('node-webpipe');

new webpipes.Block()
  .name("Formatter (Mustache)")
  .description("Converts template and input keys into an output string.")
  .input("template", "string", "Mustache template.")
  .input("*", "string", "Map of inputs for replacement in template.")
  .output("text", "string", "Rendered mustache templates.")
  .handle(function(inputs) {
    return { text: mustache.render(inputs.template, inputs) };
  })
  .listen();
