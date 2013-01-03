//<!-- IndexTools Code v4.0 - All rights reserved -->
function createITT(){
  var pid='10001025204441';
  //var trdom='stats.indexstats.com';
  //var sectrdom='secure.indexstats.com';
  var trdom = "localhost";
  var sectrdom = "secure.local";
  return new ITT(pid,trdom,sectrdom);
}
function ITT(pid,trdom,sectrdom){
  this.version="4.0";
  this.dbg=false;
  this.PID=pid;
  this.BD=( window.location.protocol.indexOf('https:')==0 ?
            'https://'+sectrdom: 'http://'+trdom );
  this.BU=this.BD+'/p.pl?a='+this.PID+'&v='+this.version;
  this.URL=document.location;
  this.cfn=new Array;
  this.cfv=new Array;
  this.IT="";
  this.na=(navigator.appName == "Netscape");
  this.ns=(navigator.appName.substring(0,9) == "Microsoft");
  this.date=new Date();
  this.DOCUMENTNAME=document.title;
  this.CAMPAIGN="";
  this.CMPPARM="";
  this.PROMO="";
  this.PROMOPARM="";
  this.EXCL="";
  this.FPCR="";
  this.FPCN='fpc'+this.PID;
  this.FPCV="";
  this.FPCD="";
  this.itvs="";
  this.itsid="";
  this.itvid="";
  if(typeof window.ITTs == "undefined") { window.ITTs = new Array; }
  this.idx = window.ITTs.length;
      window.ITTs[this.idx]=this;
      eval("ITT.prototype._e=function(){window.ITTs["+this.idx+"]._track(false,true);return true;}");
      this.ita=[
      "URL","f",
      "DOCUMENTNAME","b",
      "DOCUMENTGROUP","c",
      "MEMBERID","m",
      "ACTION","x",
      "AMOUNT","xa",
      "ORDERID","oc",
      "_S_TAX","xt",
      "_S_SHIPPING","xs",
      "_S_DISCOUNT","xd",
      "_S_SKU","p",
      "_S_PRODUCTS","u",
      "_S_UNITS","q",
      "_S_AMOUNTS","r"];
      for(i=0; i<10; i++){
        eval("window.ITTs["+this.idx+"].ita[window.ITTs["+this.idx+"].ita.length]=\"_S_P"+(1+i)+"\";window.ITTs["+this.idx+"].ita[window.ITTs["+this.idx+"].ita.length]=\"p"+(1+i)+"\"");}
      if (typeof window.imgs=="undefined") { window.imgs = new Array; }
  }
ITT.prototype.pp = function(){
    for(i=0; i+1<this.ita.length; i+=2){
      eval("if ((typeof window."+this.ita[i]+" != 'undefined') && (window."+this.ita[i]+" != '')){window.ITTs["+this.idx+"]."+this.ita[i]+"=window."+this.ita[i]+";window."+this.ita[i]+"='';}");
      eval("if ((typeof window.ITTs["+this.idx+"]."+this.ita[i]+" != 'undefined') && (window.ITTs["+this.idx+"]."+this.ita[i]+" != '')){window.ITTs["+this.idx+"].IT+=\"&"+this.ita[i+1]+"=\"+escape(window.ITTs["+this.idx+"]."+this.ita[i]+");}");}
      }
ITT.prototype.setCookie=function(name,value,off){
  var _d=new Date();
  _d.setTime(_d.getTime()+(off*1000));
  var expiry=(off>0) ? "; expires="+_d.toGMTString() : "";
  if((typeof(_S_DOMAIN) != "undefined")&&(_S_DOMAIN != "")) { this.FPCD = _S_DOMAIN; }
  var cookie=name+"="+value+expiry+"; path=/"+((this.FPCD!="")?("; domain="+this.FPCD):(""));document.cookie=cookie;}
ITT.prototype.deleteCookie = function(name){
  document.cookie=name+"=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
ITT.prototype.getCookie = function(name){
  var dc=document.cookie;
  var pos=dc.indexOf(name+"=");
  if(pos!=-1) {
    var start=pos+name.length+1;
    var end=dc.indexOf(";",start);
    if(end==-1){ end=dc.length; }
    return dc.substring(start,end);
  }
  return"";
}
ITT.prototype.FPCSupport=function(){if(this.getCookie(this.FPCN)!="")return true;var _dn="itfpctmp";var _d=new Date();var _dt=_d.getTime();this.setCookie(_dn,_dt,180);var _dr=this.getCookie(_dn);if(_dr==_dt){this.deleteCookie(_dn);return true;}return false;}
ITT.prototype.ol= function(){
  if(((window.screen)||((new Array()).toSource)||((new Array()).shift&&ns))&&(navigator.userAgent.indexOf('Mac')<0)){if(window.onload){if(!window._s_itt_ool)window._s_itt_ool=window.onload;}}eval("function olo(){if (window._s_itt_ool)window._s_itt_ool();var ln = document.links.length;for (var i = 0; i < ln; i++){if (document.links[i].onclick)document.links[i].oc = document.links[i].onclick;eval(\"document.links[i].onclick=function(){return window.ITTs["+this.idx+"].oco(this);}\");}}");
window.onload=olo;}
ITT.prototype.trk=function(s){var _s=this.BU+this.IT+s;var i=window.imgs.length;window.imgs[i]=new Image();if(this.na){if(!this.dbg){setTimeout("window.imgs["+i+"].src='"+_s+"';",1);}else{alert("window.imgs["+i+"].src='"+_s+"';");}}else{if(!this.dbg)window.imgs[i].src=_s;else{alert(_s);}}this.reset();this.IT="";return _s;}
ITT.prototype.reset=function(){for(i=8;i+1<this.ita.length;i+=2){eval("if ((typeof window.ITTs["+this.idx+"]."+this.ita[i]+" != 'undefined') && (window.ITTs["+this.idx+"]."+this.ita[i]+" != '')){window.ITTs["+this.idx+"]."+this.ita[i]+" = ''}");}}
ITT.prototype.gcpn=function(x){var z=location.search;var i=z.indexOf("?"+x+"=");var j=z.indexOf("&"+x+"=");if((i==0)||(j>-1)){var k=(i==0)?0:j;var l=z.indexOf('&',k+1);return z.substring(k+2+x.length,(l>-1)?l:z.length);}return"";}
ITT.prototype.getFileName=function(x){return(x.substring(x.lastIndexOf("/")+1,x.length));}
ITT.prototype.gh=function(x){var i=x.host.indexOf(":");return(i>=0)?x.host.substring(0,i):x.host;}
ITT.prototype.gpr=function(x){var y=x.protocol;var i=y.indexOf(":");return(i>=0)?y:y+":";}
ITT.prototype.gp=function(x){var y=x.pathname;var i=y.indexOf("/");return(i==0)?y:"/"+y;}
ITT.prototype.mxDmnRGXP=function(v){return new RegExp(this.mxRgXpStr(v),"i");}
ITT.prototype.mxR=function(e,_x,_y,_z){i=0;while(e.indexOf(_x)>=0){i++;e=e.replace(_y,_z);if(i>50)break;}return e;}
ITT.prototype.mxRgXpStr=function(e){e=this.mxR(e," "," ","");e=this.mxR(e,"\*\.","\\*\\.","\*");e=this.mxR(e,",\*",",\\*","|");e=this.mxR(e,"*","*","");e=this.mxR(e,",",",","|^");e=this.mxR(e,".","\\.",";");e=this.mxR(e,";",";","\\.");return e;}
ITT.prototype.customfield_reset=function(){this.cfn.length=0;this.cfv.length=0;}
ITT.prototype.customfield_submit=function(){if(this.cfn.length>0&&this.cfv.length>0){var _u=this.cf_ts();this.customfield_reset();this.pp();return this.trk(_u);}return"";}
ITT.prototype.customfield_set=function(n,v){this.cfn[this.cfn.length]=n;this.cfv[this.cfv.length]=v;}
ITT.prototype.cf_ts=function(){var _u="&cf=1";for(i=0;i<this.cfn.length&&i<this.cfv.length;i++){_u+="&cn"+i+"="+escape(this.cfn[i])+"&cv"+i+"="+escape(this.cfv[i]);}return _u;}
ITT.prototype.submit_action=function(){this.pp();this.trk("&ca=1");}
ITT.prototype.exitlink=function(ln){this.pp();this.trk('&el='+escape(ln));}
ITT.prototype.el=function(x){if(this.gh(location)==this.gh(x))return true;var pt=(typeof this.DOMAINS!= "undefined" &&this.DOMAINS!="")?this.mxDmnRGXP(this.DOMAINS):this.mxDmnRGXP(this.gh(location));if(pt.test(this.gh(x)))return true;if(x.href.indexOf("java")!=0)this.exitlink(x.href);return true;}
ITT.prototype.download=function(fn){this.pp();this.trk("&fn="+escape(fn));}
ITT.prototype.oco=function(x){var rv=true;if(x.oc)rv=x.oc();fn=this.getFileName(x.pathname);if(fn!=""){var pt=new RegExp("\\..?html?|\\.asp|\\.cfm|\\.jsp|\\.cgi|\\.php[3-4]?|\\.pl|\\.taf|\\.tml|\\.dll|\\.vm|\\.mv|jsessionid","i");if((!pt.test(fn))&&(fn.indexOf(".")!=-1)){if(((this.EXCL!="")&&(!this.mxDmnRGXP(this.EXCL).test(x.pathname)))||(this.EXCL.length==0)){fn=this.gpr(x)+"//"+this.gh(x)+this.gp(x);this.download(fn);}}else this.el(x);}else this.el(x);return rv;}
ITT.prototype._track=function(_d,_i){t="";r=document.referrer;if(typeof _S_REFERRER!="undefined"&&_S_REFERRER.length>0)r=_S_REFERRER;else{if((navigator.userAgent.indexOf('Mac')>=0)&&(navigator.userAgent.indexOf('MSIE 4')>=0))r=document.referrer;else if(_d){window._itt_e=window.onerror;window.onerror=this._e;if(document.location!=top.location){r=top.document.referrer;t=top.location.href;}}else{this.IT+="&nr=t";}}if(window._itt_e)window.onerror=window._itt_e;else window.onerror=null;this.pp();if(r.length>0)this.IT+="&e="+escape(r);if(t.length>0)this.IT+="&t="+escape(t);var cs=this.FPCSupport();this.date=new Date();this.IT+="&d="+escape(this.date.toGMTString());this.IT+="&n="+escape(parseInt(this.date.getTimezoneOffset()/60));this.IT+="&g="+escape(this.na?navigator.language:navigator.userLanguage);this.IT+="&h="+escape((navigator.javaEnabled()?'Y':'N'));this.IT+="&j="+escape(screen.width+'x'+screen.height);this.IT+="&k="+escape((this.ns)?screen.colorDepth:screen.pixelDepth);this.IT+="&l="+((cs)?"true":"false");if(this.CAMPAIGN!="")this.IT+="&cp="+escape(this.CAMPAIGN);if(this.CMPPARM!="")this.IT+="&cp="+escape(gcpn(this.CMPPARM));if(this.PROMO!="")this.IT+="&scp="+escape(this.PROMO);if(this.PROMOPARM!="")this.IT+="&scp="+escape(gcpn(this.PROMOPARM));if(cs&&_i)this.fpc();else this.trk("");}
ITT.prototype.submit=function(){return this._track(true,false);}
ITT.prototype._submit=function(){return this._track(true,true);}
ITT.prototype.fpc=function(){this.FPCR='&ittidx='+this.idx+'&fpc='+escape(this.getCookie(this.FPCN));this.getFPCvars();}
ITT.prototype.testscript=function(id){if(document.getElementById&&document.getElementById(id))return 1;else if(document.all&&document.all[id])return 2;else return 0;}
ITT.prototype.script=function(id,src){var r=this.testscript(id);if(r==1)document.getElementById(id).src=src;else if(r==2)document.all[id].src=src;else document.write("<SCR"+"IPT Language='JavaScript' src='"+src+"' defer></SCR"+"IPT>");}
ITT.prototype.getFPCvars=function(){var id="_s_ittscript"+this.idx;document.write("<SCR"+"IPT Language='JavaScript' id='"+id+"'></SCR"+"IPT>");this.script(id,this.BD+"/fpc.pl?a="+this.PID+this.IT+this.FPCR);this.reset();this.IT="";}
ITT.prototype.setFPCookies=function(){if(this.FPCV!="")this.setCookie(this.FPCN,this.FPCV,31536000);}
function _s_customfield_reset(){_s_itt.cfn.length=0;_s_itt.cfv.length=0;}
function _s_customfield_submit(){if(_s_itt.cfn.length>0&&_s_itt.cfv.length>0){var _u=_s_itt.cf_ts();_s_itt.customfield_reset();_s_itt.pp();return _s_itt.trk(_u);}return"";}
function _s_customfield_set(n,v){_s_itt.cfn[_s_itt.cfn.length]=n;_s_itt.cfv[_s_itt.cfv.length]=v;}
function _s_action(a,xa,oc,xd,xt,xs){if(typeof a==_s_itt._ud||a=="")return;var IU="&ca=1"+"&x="+escape(a);if(typeof xa!=_s_itt._ud)IU+="&xa="+escape(xa);if(typeof oc!=_s_itt._ud)IU+="&oc="+escape(oc);if(typeof xd!=_s_itt._ud)IU+="&xd="+escape(xd);if(typeof xt!=_s_itt._ud)IU+="&xt="+escape(xt);if(typeof xs!=_s_itt._ud)IU+="&xs="+escape(xs);_s_itt.pp();_s_itt.trk(IU);}
function _s_exitlink(ln){_s_itt.pp();_s_itt.trk('&el='+escape(ln));}var _s_itt=createITT();_s_itt.ol();_s_itt._submit();
//<!-- End of IndexTools Code -->
