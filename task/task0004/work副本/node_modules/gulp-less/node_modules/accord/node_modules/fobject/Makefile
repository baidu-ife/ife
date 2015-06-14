build:
	mv lib src
	coffee -o lib -c src

unbuild:
	rm -rf lib
	mv src lib

docme:
	make build
	node node_modules/docme/bin/docme.js README.md
	make unbuild

publish:
	make build
	npm publish .
	make unbuild
