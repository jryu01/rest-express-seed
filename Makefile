REPORTER = spec
TESTS = $(shell find test/ '*.js')

test:
	@NODE_ENV=test ./node_modules/.bin/mocha $(TESTS) \
	--reporter $(REPORTER)

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha $(TESTS) \
	--reporter $(REPORTER) \
	--growl \
	--watch

.PHONY: test test-w
