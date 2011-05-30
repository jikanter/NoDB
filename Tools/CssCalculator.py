#!/usr/bin/env python
import os
import sys


def rgb(hexdigitstring):
    """ calculate an rgb value for a hex character. return the
    formatted value ready for css consumption """
    # replace the pound sign with a zero and evaluate the digits as integers
    digitstring = hexdigitstring.replace('#','0x')
    firstvalue = eval(digitstring[0:4])
    secondvalue = eval('0x'+digitstring[4:6])
    lastvalue = eval('0x'+digitstring[6:8])
    return 'rgb(%s,%s,%s)' % (firstvalue,secondvalue,lastvalue)

def gray():
    return rgb("#f0f0f0")

def white():
    return rgb("#ffffff")

def CssStatement(selector,rules):
    """Takes a selector and one or more rules as strings and returns a CssStatement"""
    return "%s { %s }\n" % (selector,rules)

def CssTokenize(statement):
    """ take a css statement as a string, and return a dictionary
    in which the keys are the token types
    and the value is the token itself """
    (SELECTOR, STARTRULESET, RULESET, ENDRULESET) = range(4)
    startrulesetpos = statement.index("{")
    selector = statement[:startrulesetpos]
    startruleset = statement[startrulesetpos]
    endrulesetpos = statement.index("}")
    endruleset = statement[endrulesetpos]
    ruleset = statement[startrulesetpos:endrulesetpos]
    return dict(zip((SELECTOR,STARTRULESET,RULESET,ENDRULESET),(selector,startruleset,ruleset,endruleset)))
    

def ParseCssStatement(statement):
    tokens = CssTokenize(statement)
    return tokens

def ParseCssStatements(statementListString):
    return (ParseCssStatement(statement) for statement in statementListString.split("\n"))
    
    
