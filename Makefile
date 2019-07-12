
all:
	export NODE_ENV=development && ./node_modules/.bin/concurrently "npm run dev:weapp" "DEBUG=http && ./node_modules/.bin/nodemon --watch mock ./mock/server.js"
