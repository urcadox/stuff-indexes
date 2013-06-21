port = 9000

all: build

build: hakyll
	./hakyll build

hakyll: hakyll.hs
	ghc --make hakyll.hs
	./hakyll clean

preview: hakyll
	./hakyll preview -p $(port)

clean: hakyll
	./hakyll clean
