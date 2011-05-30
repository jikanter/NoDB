#!/usr/bin/env python
import urllib
import urlparse
import sys

class XcodeIntegrator:
    def __init__(self, xcodeversion=None):
        if not xcodeversion: xcodeversion = 3
        if not isinstance(xcodeversion, int):
            try:
                xcodeversion = int(xcodeversion)
            except ValueError:
                xcodeversion = 3
        self.xcodeversion = xcodeversion
        self.baseDocumentLocation = "/www/Developer/Documentation"
    
    def localDocsForRemote(self, url):
        if not ("http://" in url):
            return url
        self.remoteUrl = url
        self.localUrl = list(urlparse.urlparse(self.remoteUrl))
        self.localUrl[1] = self.localUrl[1].replace("developer.apple.com", "local.developer.apple.com")
        self.localUrl[1] += self.baseDocumentLocation
        self.localUrl[0] = self.localUrl[0] + "://"
        return self.localUrl
        
if __name__ == "__main__":
    try:
        sys.argv[1]
    except IndexError:
        sys.stderr.write("usage: XcodeIntegrator.py <remote-url>\n")
        sys.exit(1)
    if not sys.argv[1]: # handle an empty string correctly
        sys.stderr.write("usage: XcodeIntegrator.py <remote-url>\n")
        sys.exit(2)
    integrator = XcodeIntegrator()
    sys.stdout.write(''.join(integrator.localDocsForRemote(sys.argv[1]))+"\n")
  
__test__ = {"doctest" : 
'''
>>> x = "http://developer.apple.com/documentation/DeviceDrivers/Conceptual/AccessingHardware/index.html"
>>> integrator = XcodeIntegrator()
>>> ''.join(integrator.localDocsForRemote(x))+"\n"
"http://local.developer.apple.com/www/Developer/Documentation/documentation/DeviceDrivers/Conceptual/AccessingHardware/index.html"
'''
}
  
