TARGETS = Resources/AppleSchemes.js \
Resources/WebPlist.js \
Resources/AppleHidden.js \
exhibit \

SUBPROJECTS = tabulator/ajaw \
tabulator/tab \

JSDIRECTORIES = src/mashups/api \
src/mashups/api/scripts \


.PHONY: all
all: $(TARGETS)
%.js : %.plist
	Tools/pl2js $< > $@
exhibit:
	ant
minify:
	ant jsmin

.PHONY: doc
doc:
	jsdoc --directory=src/webapp/doc -r=2 $(JSDIRECTORIES)

#%.plist.xml : %.plist
#	plutil -convert xml1 -e plist.xml $@;
