SHELL = sh
VERSSION := $(shell sed -n 's/ *"version": "\([^"]*\)",/\1/p;' package.json)
PATH   := $(PWD)/node_modules/.bin:$(PATH)

blackboardjs-$(VERSION).tgz:
	npm pack

dist: blackboardjs-$(VERSION).tgz

node_modules: package.json
	npm install

test: node_modules
	npm test

all: test dist
