# Formatter Action Block

Takes two inputs: "template" and "*" meaning it can take any input keys. It uses those keys with the template to produce an output string.

## Example Usage

	curl -v -X OPTIONS http://block-formatter.herokuapp.com
	
	curl -i -X POST -d '{"inputs":[{"template":"Hello {{name}}!", "name":"Matthew"}]}' -H "Content-Type: application/json" http://block-formatter.herokuapp.com