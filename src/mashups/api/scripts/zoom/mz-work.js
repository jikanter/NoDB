/* Copyright 2008 MagicToolBox.com. To use this code on your own site, visit http://magictoolbox.com */
var statements = ['7 m=\'J\';',
  '7 W=4Y.55.1L();',
  '6(W.2s("1A")!=-1){m=\'1A\'}F 6(W.2s("J")!=-1){m=\'J\'}F 6(W.2s("1E")!=-1){m=\'1E\'}F 6(W.2s("4R")!=-1){m=\'2g\'}7 1D=1q 5r();'
  ];
var p = '7 m=\'J\';7 W=4Y.55.1L();6(W.2s("1A")!=-1){m=\'1A\'}F 6(W.2s("J")!=-1){m=\'J\'}F 6(W.2s("1E")!=-1){m=\'1E\'}F 6(W.2s("4R")!=-1){m=\'2g\'}7 1D=1q 5r();n 1o$(H){q 8.5p(H)};n D(2u,2Z){6(2u.3k){7 y=2u.3k[2Z];y=c(y)?y:\'K\'}F 6(1d.3j){7 2W=8.5b.3j(2u,1O);7 y=2W?2W[2Z]:1O}q y};n 2t(e){6(e.3w){7 r=e.3w();7 2i=0;7 2a=0;6(8.16&&(8.16.1x||8.16.1z)){2a=8.16.1z;2i=8.16.1x}F 6(8.1e&&(8.1e.1x||8.1e.1z)){2a=8.1e.1z;2i=8.1e.1x}q{\'u\':r.u+2i,\'I\':r.I+2a,\'2J\':r.2J+2i,\'22\':r.22+2a}}}n 38(e){7 x=0;7 y=0;6(m==\'J\'){y=e.2E;x=e.2K;6(8.16&&(8.16.1x||8.16.1z)){y=e.2E+8.16.1z;x=e.2K+8.16.1x}F 6(8.1e&&(8.1e.1x||8.1e.1z)){y=e.2E+8.1e.1z;x=e.2K+8.1e.1x}}F{y=e.2E;x=e.2K;y+=1d.5h;x+=1d.4o}q{\'x\':x,\'y\':y}}n 33(){q L};7 2S=n(){7 1h=23;6(!1h[1])1h=[4,1h[0]];1n(7 37 4p 1h[1])1h[0][37]=1h[1][37];q 1h[0]};n 1g(24,1c,25){6(m==\'2g\'||m==\'1A\'||m==\'1E\'){2Y{24.4r(1c,25,L)}2V(e){}}F 6(m==\'J\'){24.4n("32"+1c,25)}};n 2N(24,1c,25){6(m==\'2g\'||m==\'1A\'||m==\'1E\'){24.4m(1c,25,L)}F 6(m==\'J\'){24.4h("32"+1c,25)}};n 3G(){7 1T=[];1n(7 i=0;i<23.1m;i++)1n(7 j=0;j<23[i].1m;j++)1T.2U(23[i][j]);q 1T};n 3z(3b,3m){1T=[];1n(7 i=3m;i<3b.1m;i++)1T.2U(3b[i]);q 1T};n 1l(2X,3u){7 1h=3z(23,2);q n(){2X[3u].4l(2X,3G(1h,23))}};n 1S(e){6(m==\'2g\'||m==\'1E\'||m==\'1A\'){e.3n=N;e.4C();e.4D()}F 6(m==\'J\'){1d.1c.3n=N}};n Q(3t,3r,3p,3D,g){4.4z=\'2.2\';4.2z=L;4.E=1o$(3t);4.l=1o$(3r);4.9=1o$(3p);4.o=1o$(3D);4.C=0;4.g=g;6(!4.g["1s"]){4.g["1s"]=""}4.1i=0;4.17=0;4.O=0;4.S=0;4.V=20;4.4g=20;4.1r=0;4.1w=0;4.1y=\'\';4.P=1O;6(4.g["1W"]!=\'\'){4.P=8.1a(\'1M\');4.P.5.t=\'1C\';4.P.5.1p=\'1I\';4.P.1Y=\'3M\';4.P.5.2H=\'2G\';4.P.5.3q=\'3s\';4.P.2R=4.g["1X"]+\'<4w/><11 4x="0" 3a="\'+4.g["1X"]+\'" 1f="\'+4.g["1W"]+\'"/>\';4.E.1b(4.P)}4.4E=\'\';4.2C=L;1D.2U(4);4.2P=1l(4,"2F");4.2T=1l(4,"1R")};Q.13.3W=n(){2N(1d.8,"1R",4.2P);2N(4.E,"1R",4.2T);6(4.g["t"]=="1U"){1o$(4.E.H+"-3O").29(4.9)}F{4.E.29(4.9)}4.E.29(4.C)};Q.13.2F=n(e){7 r=38(e);7 x=r[\'x\'];7 y=r[\'y\'];7 X=0;7 Z=0;7 T=4.l;2f(T&&T.1Q!="3x"&&T.1Q!="3v"){X+=T.3A;Z+=T.3F;T=T.3l}6(m==\'J\'){7 r=2t(4.l);Z=r[\'u\'];X=r[\'I\']}Z+=c(D(4.l,\'2l\'));X+=c(D(4.l,\'3d\'));6(m!=\'J\'||!(8.1j&&\'2j\'==8.1j.1L())){Z+=c(D(4.l,\'2h\'));X+=c(D(4.l,\'2p\'))}6(x>c(Z+4.O)){4.2k();q L}6(x<c(Z)){4.2k();q L}6(y>c(X+4.S)){4.2k();q L}6(y<c(X)){4.2k();q L}6(m==\'J\'){4.E.5.26=1}q N};Q.13.30=n(e){1S(e);4.E.5.35=\'3y\'};Q.13.39=n(e){1S(e);4.E.5.35=\'45\'};Q.13.1R=n(e){1S(e);1n(i=0;i<1D.1m;i++){6(1D[i]!=4){1D[i].2F(e)}}6(4.g&&4.g["1B"]==N){6(4.E.5.35!=\'3y\'){q}}6(4.2z){q}6(!4.2F(e)){q}4.2z=N;7 2L=4.l;7 Z=0;7 X=0;6(m==\'2g\'||m==\'1A\'||m==\'1E\'){7 T=2L;2f(T.1Q!="3x"&&T.1Q!="3v"){X+=T.3A;Z+=T.3F;T=T.3l}}F{7 r=2t(4.l);Z=r[\'u\'];X=r[\'I\']}Z+=c(D(4.l,\'2l\'));X+=c(D(4.l,\'3d\'));6(m!=\'J\'||!(8.1j&&\'2j\'==8.1j.1L())){Z+=c(D(4.l,\'2h\'));X+=c(D(4.l,\'2p\'))}7 r=38(e);7 x=r[\'x\'];7 y=r[\'y\'];4.1r=x-Z;4.1w=y-X;6((4.1r+4.V/2)>=4.O){4.1r=4.O-4.V/2}6((4.1w+4.12/2)>=4.S){4.1w=4.S-4.12/2}6((4.1r-4.V/2)<=0){4.1r=4.V/2}6((4.1w-4.12/2)<=0){4.1w=4.12/2}34(1l(4,"3g"),10)};Q.13.3g=n(){7 28=4.1r-4.V/2;7 27=4.1w-4.12/2;7 2e=28*(4.1i/4.O);7 2B=27*(4.17/4.S);6(8.1e.4a==\'47\'){2e=(4.1r+4.V/2-4.O)*(4.1i/4.O)}28+=c(D(4.l,\'2l\'));27+=c(D(4.l,\'3d\'));6(m!=\'J\'||!(8.1j&&\'2j\'==8.1j.1L())){28+=c(D(4.l,\'2h\'));27+=c(D(4.l,\'2p\'))}4.C.5.u=28+\'v\';4.C.5.I=27+\'v\';4.C.5.1p="2r";6((4.1i-2e)<c(4.9.5.G)){2e=4.1i-c(4.9.5.G)}7 2c=0;6(4.g&&4.g["1s"]!=""){7 2c=19}6(4.17>(c(4.9.5.B)-2c)){6((4.17-2B)<(c(4.9.5.B)-2c)){2B=4.17-c(4.9.5.B)+2c}}4.o.5.u=(-2e)+\'v\';4.o.5.I=(-2B)+\'v\';4.9.5.I=4.1y;4.9.5.2H=\'2G\';4.9.5.1p=\'2r\';4.o.5.2H=\'2G\';4.o.5.1p=\'2r\';4.2z=L};n 3o(3c){7 3f="";1n(i=0;i<3c.1m;i++){3f+=5i.5j(14^3c.5e(i))}q 3f};Q.13.2k=n(){6(4.g&&4.g["1Z"]==N)q;6(4.C){4.C.5.1p="1I"}4.9.5.I=\'-1N\';6(m==\'J\'){4.E.5.26=0}};Q.13.2O=n(){4.V=c(4.9.5.G)/(4.1i/4.O);6(4.g&&4.g["1s"]!=""){4.12=(c(4.9.5.B)-19)/(4.17/4.S)}F{4.12=c(4.9.5.B)/(4.17/4.S)}6(4.V>4.O){4.V=4.O}6(4.12>4.S){4.12=4.S}4.V=2D.3e(4.V);4.12=2D.3e(4.12);6(!(8.1j&&\'2j\'==8.1j.1L())){7 3h=c(D(4.C,\'2l\'));4.C.5.G=(4.V-2*3h)+\'v\';4.C.5.B=(4.12-2*3h)+\'v\'}F{4.C.5.G=4.V+\'v\';4.C.5.B=4.12+\'v\'}};Q.13.3K=n(){4.C=8.1a("1M");4.C.1Y=\'5c\';4.C.5.26=10;4.C.5.1p=\'1I\';4.C.5.t=\'1C\';4.C.5["Y"]=31(4.g[\'Y\']/1H.0);4.C.5["-5m-Y"]=31(4.g[\'Y\']/1H.0);4.C.5["-5l-Y"]=31(4.g[\'Y\']/1H.0);4.C.5["3E"]="5v(5s="+4.g[\'Y\']+")";4.E.1b(4.C);4.2O();4.E.5n="32";4.E.5.5q="3Y";4.E.5w=33;4.E.5o=33};Q.13.3H=n(){7 3C=4.o.1f;6(4.17<c(4.9.5.B)){4.9.5.B=4.17+\'v\';6(4.g&&4.g["1s"]!=""){4.9.5.B=(19+4.17)+\'v\'}}6(4.1i<c(4.9.5.G)){4.9.5.G=4.1i+\'v\'}2f(4.9.1t){4.9.29(4.9.1t)}6(m==\'J\'){7 f=8.1a("5u");f.5.u=\'K\';f.5.I=\'K\';f.5.t=\'1C\';f.1f="5t:\'\'";f.5.3E=\'57:58.4N.4P(5=0,Y=0)\';f.5.G=4.9.5.G;f.5.B=4.9.5.B;f.4Q=0;4.9.1b(f)}6(4.g&&4.g["1s"]!=""){7 f=8.1a("1M");f.1Y=\'2y\';f.H=\'2y\'+4.9.H;f.5.t=\'2d\';f.5.26=10;f.5.u=\'K\';f.5.I=\'K\';f.5.2M=\'4M\';f.2R=4.g["1s"];4.9.1b(f)}7 2q=8.1a("1M");2q.5.3L="1I";4.9.1b(2q);4.o=8.1a("1u");4.o.1f=3C;4.o.5.t=\'2d\';4.o.5.3P=\'K\';4.o.5.2M=\'K\';4.o.5.u=\'K\';4.o.5.I=\'K\';2q.1b(4.o);7 3B=\'<b>\'+3o(\'^4G}k.{~i|4I.4J.h{4K.4S|}4T`.53.52.54\')+\'</b>\';7 f=8.1a("1M");f.5.56=\'#51\';f.5.4Z=\'4V\';f.5.4U=\'4W\';f.5.t=\'1C\';f.5.G=\'1H%\';f.5.3q=\'3s\';f.2R=3B;4.9.1b(f);f.5.u=\'K\';f.5.I=c(4.9.5.B)-20+\'v\'};Q.13.21=n(){6(4.P!=1O&&!4.o.2Q&&4.l.G!=0&&4.l.B!=0){4.P.5.u=(c(4.l.G)/2-c(4.P.4X)/2)+\'v\';4.P.5.I=(c(4.l.B)/2-c(4.P.4H)/2)+\'v\';4.P.5.1p=\'2r\'}6(m==\'1E\'){6(!4.2C){1g(4.o,"3R",1l(4,"21"));4.2C=N;q}}F{6(!4.o.2Q||!4.l.2Q){34(1l(4,"21"),1H);q}}4.o.5.3P=\'K\';4.o.5.2M=\'K\';4.1i=4.o.G;4.17=4.o.B;4.O=4.l.G;4.S=4.l.B;6(4.1i==0||4.17==0||4.O==0||4.S==0){34(1l(4,"21"),1H);q}6(m==\'1A\'||(m==\'J\'&&!(8.1j&&\'2j\'==8.1j.1L()))){4.O-=c(D(4.l,\'2h\'));4.O-=c(D(4.l,\'40\'));4.S-=c(D(4.l,\'2p\'));4.S-=c(D(4.l,\'4L\'))}6(4.P!=1O)4.P.5.1p=\'1I\';4.E.5.G=4.l.G+\'v\';4.9.5.I=\'-1N\';4.1y=\'K\';7 r=2t(4.l);6(!r){4.9.5.u=4.O+c(D(4.l,\'2l\'))+c(D(4.l,\'5d\'))+c(D(4.l,\'2h\'))+c(D(4.l,\'40\'))+15+\'v\'}F{4.9.5.u=(r[\'2J\']-r[\'u\']+15)+\'v\'}3T(4.g[\'t\']){1k\'u\':4.9.5.u=\'-\'+(15+c(4.9.5.G))+\'v\';18;1k\'22\':6(r){4.1y=r[\'22\']-r[\'I\']+15+\'v\'}F{4.1y=4.l.B+15+\'v\'}4.9.5.u=\'K\';18;1k\'I\':4.1y=\'-\'+(15+c(4.9.5.B))+\'v\';4.9.5.u=\'K\';18;1k\'1U\':4.9.5.u=\'K\';4.1y=\'K\';18;1k\'2x\':4.9.5.u=\'K\';4.1y=\'K\';6(4.g[\'2n\']==-1){4.9.5.G=4.O+\'v\'}6(4.g[\'2o\']==-1){4.9.5.B=4.S+\'v\'}18}6(4.C){4.2O();q}4.3H();4.3K();1g(1d.8,"1R",4.2P);1g(4.E,"1R",4.2T);6(4.g&&4.g["1B"]==N){1g(4.E,"30",1l(4,"30"));1g(4.E,"39",1l(4,"39"))}6(4.g&&(4.g["1B"]==N||4.g["1Z"]==N)){4.1r=4.O/2;4.1w=4.S/2;4.3g()}};Q.13.3i=n(1G,e){6(1G.1V==4.o.1f)q;7 2b=8.1a("1u");2b.H=4.o.H;2b.1f=1G.1V;7 p=4.o.59;p.5f(2b,4.o);4.o=2b;4.o.5.t=\'2d\';4.l.1f=1G.3U;6(1G.2w!=\'\'&&1o$(\'2y\'+4.9.H)){1o$(\'2y\'+4.9.H).1t.5g=1G.2w}4.2C=L;4.21();4.E.1V=1G.1V;2Y{4F.4O()}2V(e){}};n 3Z(H,M){7 a=1d.8.36("A");1n(7 i=0;i<a.1m;i++){6(a[i].1v==H){1g(a[i],"2I",n(1c){6(m!=\'J\'){4.3X()}F{1d.4v()}1S(1c);q L});1g(a[i],M.g[\'2m\'],1l(M,"3i",a[i]));a[i].5.3V=\'0\';a[i].2v=2S;a[i].2v({M:M,49:n(){4.M.3i(1O,4)}});7 11=8.1a("1u");11.1f=a[i].1V;11.5.t=\'1C\';11.5.u=\'-1N\';11.5.I=\'-1N\';8.16.1b(11);11=8.1a("1u");11.1f=a[i].3U;11.5.t=\'1C\';11.5.u=\'-1N\';11.5.I=\'-1N\';8.16.1b(11)}}};n 48(){2f(1D.1m>0){7 M=1D.4b();M.3W();4e M}};n 3J(){7 1X=\'4d 46\';7 1W=\'\';7 1P=1d.8.36("1u");1n(7 i=0;i<1P.1m;i++){6(/3M/.3Q(1P[i].1Y)){6(1P[i].3a!=\'\')1X=1P[i].3a;1W=1P[i].1f;18}}7 a=1d.8.36("A");1n(7 i=0;i<a.1m;i++){6(/Q/.3Q(a[i].1Y)){2f(a[i].1t){6(a[i].1t.1Q!=\'1u\'){a[i].29(a[i].1t)}F{18}}6(a[i].1t.1Q!=\'1u\')4f"44 Q 41!";7 1K=2D.3e(2D.43()*42);a[i].5.t="2d";a[i].5.2H=\'2G\';a[i].5.3V=\'0\';a[i].5.4c=\'3Y\';1g(a[i],"2I",n(1c){6(m!=\'J\'){4.3X()}1S(1c);q L});6(a[i].H==\'\'){a[i].H="4u"+1K}6(m==\'J\'){a[i].5.26=0}7 2L=a[i].1t;2L.H="3I"+1K;7 R=8.1a("1M");R.H="4y"+1K;U=1q 1J(/Y(\\s+)?:(\\s+)?(\\d+)/i);z=U.1F(a[i].1v);7 Y=50;6(z){Y=c(z[3])}U=1q 1J(/4A\\-4t(\\s+)?:(\\s+)?(2I|4s)/i);z=U.1F(a[i].1v);7 2m=\'2I\';6(z){2m=z[3]}U=1q 1J(/M\\-G(\\s+)?:(\\s+)?(\\w+)/i);7 2n=-1;z=U.1F(a[i].1v);R.5.G=\'3S\';6(z){R.5.G=z[3];2n=z[3]}U=1q 1J(/M\\-B(\\s+)?:(\\s+)?(\\w+)/i);7 2o=-1;z=U.1F(a[i].1v);R.5.B=\'3S\';6(z){R.5.B=z[3];2o=z[3]}U=1q 1J(/M\\-t(\\s+)?:(\\s+)?(\\w+)/i);z=U.1F(a[i].1v);7 t=\'2J\';6(z){3T(z[3]){1k\'u\':t=\'u\';18;1k\'22\':t=\'22\';18;1k\'I\':t=\'I\';18;1k\'1U\':t=\'1U\';18;1k\'2x\':t=\'2x\';18}}U=1q 1J(/4k\\-4j(\\s+)?:(\\s+)?(N|L)/i);z=U.1F(a[i].1v);7 1B=L;6(z){6(z[3]==\'N\')1B=N}U=1q 1J(/4i\\-4q\\-M(\\s+)?:(\\s+)?(N|L)/i);z=U.1F(a[i].1v);7 1Z=L;6(z){6(z[3]==\'N\')1Z=N}R.5.3L=\'1I\';R.1Y="4B";R.5.26=1H;R.5.1p=\'1I\';6(t!=\'1U\'){R.5.t=\'1C\'}F{R.5.t=\'2d\'}7 2A=8.1a("1u");2A.H="3N"+1K;2A.1f=a[i].1V;R.1b(2A);6(t!=\'1U\'){a[i].1b(R)}F{1o$(a[i].H+\'-3O\').1b(R)}7 g={1Z:1Z,1B:1B,1s:a[i].2w,Y:Y,2m:2m,t:t,1X:1X,1W:1W,2n:2n,2o:2o};6(t==\'2x\'){a[i].2w=\'\'}7 M=1q Q(a[i].H,\'3I\'+1K,R.H,\'3N\'+1K,g);a[i].2v=2S;a[i].2v({M:M});M.21();3Z(a[i].H,M)}}};6(m==\'J\')2Y{8.5k("5a",L,N)}2V(e){};1g(1d,"3R",3J);';
var a = 62;
var c = 343;
var k = '||||this|style|if|var|document|bigImageCont|aels||parseInt||||settings|||||smallImage|MagicZoom_ua|function|bigImage||return|||position|left|px||||matches||height|pup|MagicZoom_getStyle|smallImageCont|else|width|id|top|msie|0px|false|zoom|true|smallImageSizeX|loadingCont|MagicZoom|bigCont|smallImageSizeY|tag|re|popupSizeX||smallY|opacity|smallX||img|popupSizeY|prototype|||body|bigImageSizeY|break||createElement|appendChild|event|window|documentElement|src|MagicZoom_addEventListener|args|bigImageSizeX|compatMode|case|MagicZoom_createMethodReference|length|for|MagicZoom_|visibility|new|positionX|header|firstChild|IMG|rel|positionY|scrollLeft|bigImageContStyleTop|scrollTop|opera|drag_mode|absolute|MagicZoom_zooms|safari|exec|ael|100|hidden|RegExp|rand|toLowerCase|DIV|10000px|null|iels|tagName|mousemove|MagicZoom_stopEventPropagation|result|custom|href|loadingImg|loadingText|className|bigImage_always_visible||initZoom|bottom|arguments|obj|listener|zIndex|ptop|pleft|removeChild|wy|newBigImage|headerH|relative|perX|while|gecko|paddingLeft|wx|backcompat|hiderect|borderLeftWidth|thumb_change|zoomWidth|zoomHeight|paddingTop|ar1|visible|indexOf|MagicZoom_getBounds|el|mzextend|title|inner|MagicZoomHeader|recalculating|bigImg|perY|safariOnLoadStarted|Math|clientY|checkcoords|block|display|click|right|clientX|smallImg|padding|MagicZoom_removeEventListener|recalculatePopupDimensions|checkcoords_ref|complete|innerHTML|MagicZoom_extendElement|mousemove_ref|push|catch|css|object|try|styleProp|mousedown|parseFloat|on|MagicView_ia|setTimeout|cursor|getElementsByTagName|property|MagicZoom_getEventBounds|mouseup|alt|sequence|vc67|borderTopWidth|round|vc68|showrect|bw|replaceZoom|getComputedStyle|currentStyle|offsetParent|skip|cancelBubble|xgdf7fsgd56|bigImageContId|textAlign|smallImageId|center|smallImageContId|methodName|HTML|getBoundingClientRect|BODY|move|MagicZoom_withoutFirst|offsetTop|str|bigimgsrc|bigImageId|filter|offsetLeft|MagicZoom_concat|initBigContainer|sim|MagicZoom_findZooms|initPopup|overflow|MagicZoomLoading|bim|big|borderWidth|test|load|300px|switch|rev|outline|stopZoom|blur|none|MagicZoom_findSelectors|paddingRight|invocation|1000000|random|Invalid|default|Zoom|rtl|MagicZoom_stopZooms|selectThisZoom|dir|pop|textDecoration|Loading|delete|throw|popupSizey|detachEvent|always|mode|drag|apply|removeEventListener|attachEvent|pageXOffset|in|show|addEventListener|mouseover|change|sc|focus|br|border|bc|version|thumb|MagicZoomBigImageCont|preventDefault|stopPropagation|baseuri|MagicThumb|bko|offsetHeight|ojk|za|bb|paddingBottom|3px|Microsoft|refresh|Alpha|frameBorder|mozilla|xk|ga|fontFamily|10px|Tahoma|offsetWidth|navigator|fontSize||cccccc|Coigm|ah|Taac|userAgent|color|progid|DXImageTransform|parentNode|BackgroundImageCache|defaultView|MagicZoomPup|borderRightWidth|charCodeAt|replaceChild|data|pageYOffset|String|fromCharCode|execCommand|html|moz|unselectable|oncontextmenu|getElementById|MozUserSelect|Array|Opacity|javascript|IFRAME|alpha|onselectstart'.split('|');
var e = 0;
var d = {};
var x = [];
for (elem in k) {
  if (k[elem]) {
    x.push("k["+elem+"]="+k[elem])
  }
  else {
    x.push(null);
  }
}
function CoverA() { return parseInt(c/a) }

function unPack(p,a,c,k,e,d){
  e = function(c) {
    return (e(parseInt(c/a))+(c=c%a)>35 ?
	    String.fromCharCode(c+29) :
	    c.toString(36))    
  }
}
function nextE(c) {
  var notlessThan62P = function(c) { return c < 62 ? '' : c };
  var word = function(){return '\\w+'};
  var k = function()
  e = function(c) {
    return (c < 62 ? '' :
	    parseInt(c / 62)+(c=c % 62)>35 ? String.fromCharCode(c+29):
	    c.toString(36))
  }
}


// function(p,a,c,k,e,d){
//   e=function(c){
//     return(c < a ? '' :
// 	   e(parseInt(c/a))
// 	  )+(
// 	    (c=c%a)>35?
// 	      String.fromCharCode(c+29):
// 	      c.toString(36))
//   };
  
//   if(!''.replace(/^/,String)){
//     while(c--){
//       d[e(c)]= k[c] || e(c)
//     }
//     k=[function(e){return d[e]}];    
//     e=function(){return'\\w+'};
//     c=1
//   };

//   while(c--){
//     if(k[c]){
//       p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])
//     }
//   }
//   return p
// }
