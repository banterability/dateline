COFFEE=./node_modules/coffee-script/bin/coffee

usage:
	@echo ''
	@echo 'Task         : Description'
	@echo '------------ : -----------'
	@echo 'make build   : Recompile from Coffeescript'
	@echo 'make test    : Recompile and run tests'
	@echo ''

.PHONY: test

build:
	$(COFFEE) -co lib src

test: build
	npm test
