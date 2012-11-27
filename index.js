var _ = require('underscore'),
	mustache = require('mustache'),
	express = require('express'),
	app = express();

app.use(express.bodyParser());

// Simple logger
app.use(function (request, response, next) {
	console.log('%s %s', request.method, request.url);
	next();
});

// Handle uncaughtException
process.on('uncaughtException', function (error) {
	exit('Error: ' + error.message);
});

var exit = function (message) {
	if (message) {
		console.log(message);
	}
	console.log('Exiting...');
	process.exit(1);
};

app.options('/', function (request, response) {

	// CORS support
	response.set('Access-Control-Allow-Origin', '*');
	response.set('Access-Control-Allow-Methods', 'OPTIONS,POST');
	response.set('Access-Control-Allow-Headers', 'Content-Type');

	// The block definition
	response.send({
		name: "Parse Markdown",
		description: "Converts template and input keys into an output string.",
		inputs: [{
			name: "template",
			type: "string",
			description: "Mustache template."
		},{
			name: "*",
			type: "map",
			description: "Map of inputs for replacement in template."
		}],
		outputs: [{
			name: "text",
			type: "string",
			description: "Rendered mustache templates."
		}]
	});
});

app.post('/', function (request, response) {

	if (!_.has(request.body, 'inputs') && isArray(request.body.inputs)) {
		exit('WebPipe "input" is missing or formatted incorrectly.');
	}

	var inputs = request.body.inputs[0];
	var outputs = {
		outputs: []
	};

	console.log(inputs);
	// Verify POST keys exist
	if (!_.has(inputs, 'template')) {
		exit('Input is missing required "template" content.');
	}
	
	if (!_.has(inputs, '*')) {
		exit('Input is missing required "*".');
	}
	
	var text = mustache.render(inputs.template, inputs['*']);
	if (!text) {
		console.log('Failed to convert template.');
		response.send(500);
	} else {
		outputs.outputs.push({
			text: text
		});
		response.json(outputs);
	}
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Listening on ' + port);
});