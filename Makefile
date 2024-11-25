install:
	npm ci
start:
	npm run dev
lint:
	npx eslint .
test-coverage:
	npm test -- --coverage --coverageProvider=v8
test: 
	npm run test
	
.PHONY: test
