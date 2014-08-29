COFFEE=./node_modules/coffee-script/bin/coffee

usage:
	@echo ''
	@echo 'Task         : Description'
	@echo '------------ : -----------'
	@echo 'make build   : Recompile from Coffeescript'
	@echo ''

build:
	$(COFFEE) -co lib src/

.PHONY: build
