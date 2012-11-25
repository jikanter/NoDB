TARGETS = Resources/AppleSchemes.js \
Resources/WebPlist.js \
Resources/AppleHidden.js \
exhibit \

SUBPROJECTS = tabulator/ajaw \
tabulator/tab \

.PHONY: all
all: $(TARGETS)
%.js : %.plist
	Tools/pl2js $< > $@
exhibit:
	ant
minify:
	ant jsmin
#%.plist.xml : %.plist
#	plutil -convert xml1 -e plist.xml $@;
