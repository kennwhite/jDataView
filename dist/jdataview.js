!function(a){"use strict";function b(a,b){return!b&&a instanceof Array?a:Array.prototype.slice.call(a)}function c(a,b){return void 0!==a?a:b}function d(a,b,e,f){if(a instanceof d){var g=a.slice(b,b+e);return g._littleEndian=c(f,g._littleEndian),g}if(!(this instanceof d))return new d(a,b,e,f);if(this.buffer=a=d.wrapBuffer(a),this._isArrayBuffer=i.ArrayBuffer&&a instanceof ArrayBuffer,this._isPixelData=!0&&i.PixelData&&a instanceof CanvasPixelArray,this._isDataView=i.DataView&&this._isArrayBuffer,this._isNodeBuffer=!1,!(this._isArrayBuffer||this._isPixelData||a instanceof Array))throw new TypeError("jDataView buffer has an incompatible type");this._littleEndian=!!f;var h="byteLength"in a?a.byteLength:a.length;this.byteOffset=b=c(b,0),this.byteLength=e=c(e,h-b),this._isDataView?this._view=new DataView(a,b,e):this._checkBounds(b,e,h),this._engineAction=this._isDataView?this._dataViewAction:this._isArrayBuffer?this._arrayBufferAction:this._arrayAction}function e(a){for(var b=i.ArrayBuffer?Uint8Array:Array,c=new b(a.length),d=0,e=a.length;e>d;d++)c[d]=255&a.charCodeAt(d);return c}function f(a){return a>=0&&31>a?1<<a:f[a]||(f[a]=Math.pow(2,a))}function g(a,b){this.lo=a,this.hi=b}function h(){g.apply(this,arguments)}var i={NodeBuffer:!1,DataView:"DataView"in a,ArrayBuffer:"ArrayBuffer"in a,PixelData:!0&&"CanvasPixelArray"in a&&"ImageData"in a&&"document"in a};if(i.PixelData){var j=function(a,b){var c=j.context2d.createImageData((a+3)/4,1).data;if(c.byteLength=a,void 0!==b)for(var d=0;a>d;d++)c[d]=b[d];return c};j.context2d=document.createElement("canvas").getContext("2d")}var k={Int8:1,Int16:2,Int32:4,Uint8:1,Uint16:2,Uint32:4,Float32:4,Float64:8};d.wrapBuffer=function(a){switch(typeof a){case"number":if(i.ArrayBuffer)a=new Uint8Array(a).buffer;else if(i.PixelData)a=j(a);else{a=new Array(a);for(var c=0;c<a.length;c++)a[c]=0}return a;case"string":a=e(a);default:return"length"in a&&!(i.ArrayBuffer&&a instanceof ArrayBuffer||i.PixelData&&a instanceof CanvasPixelArray)&&(i.ArrayBuffer?a instanceof ArrayBuffer||(a=new Uint8Array(a).buffer,a instanceof ArrayBuffer||(a=new Uint8Array(b(a,!0)).buffer)):a=i.PixelData?j(a.length,a):b(a)),a}},d.createBuffer=function(){return d.wrapBuffer(arguments)},d.Uint64=g,g.prototype={valueOf:function(){return this.lo+f(32)*this.hi},toString:function(){return Number.prototype.toString.apply(this.valueOf(),arguments)}},g.fromNumber=function(a){var b=Math.floor(a/f(32)),c=a-b*f(32);return new g(c,b)},d.Int64=h,h.prototype="create"in Object?Object.create(g.prototype):new g,h.prototype.valueOf=function(){return this.hi<f(31)?g.prototype.valueOf.apply(this,arguments):-(f(32)-this.lo+f(32)*(f(32)-1-this.hi))},h.fromNumber=function(a){var b,c;if(a>=0){var d=g.fromNumber(a);b=d.lo,c=d.hi}else c=Math.floor(a/f(32)),b=a-c*f(32),c+=f(32);return new h(b,c)};var l=d.prototype={_offset:0,_bitOffset:0,compatibility:i,_checkBounds:function(a,b,d){if("number"!=typeof a)throw new TypeError("Offset is not a number.");if("number"!=typeof b)throw new TypeError("Size is not a number.");if(0>b)throw new RangeError("Length is negative.");if(0>a||a+b>c(d,this.byteLength))throw new RangeError("Offsets are out of bounds.")},_action:function(a,b,d,e,f){return this._engineAction(a,b,c(d,this._offset),c(e,this._littleEndian),f)},_dataViewAction:function(a,b,c,d,e){return this._offset=c+k[a],b?this._view["get"+a](c,d):this._view["set"+a](c,e,d)},_arrayBufferAction:function(b,d,e,f,g){var h,i=k[b],j=a[b+"Array"];if(f=c(f,this._littleEndian),1===i||(this.byteOffset+e)%i===0&&f)return h=new j(this.buffer,this.byteOffset+e,1),this._offset=e+i,d?h[0]:h[0]=g;var l=new Uint8Array(d?this.getBytes(i,e,f,!0):i);return h=new j(l.buffer,0,1),d?h[0]:(h[0]=g,this._setBytes(e,l,f),void 0)},_arrayAction:function(a,b,c,d,e){return b?this["_get"+a](c,d):this["_set"+a](c,e,d)},_getBytes:function(a,d,e){e=c(e,this._littleEndian),d=c(d,this._offset),a=c(a,this.byteLength-d),this._checkBounds(d,a),d+=this.byteOffset,this._offset=d-this.byteOffset+a;var f=this._isArrayBuffer?new Uint8Array(this.buffer,d,a):(this.buffer.slice||Array.prototype.slice).call(this.buffer,d,d+a);return e||1>=a?f:b(f).reverse()},getBytes:function(a,d,e,f){var g=this._getBytes(a,d,c(e,!0));return f?b(g):g},_setBytes:function(a,d,e){var f=d.length;if(0!==f){if(e=c(e,this._littleEndian),a=c(a,this._offset),this._checkBounds(a,f),!e&&f>1&&(d=b(d,!0).reverse()),a+=this.byteOffset,this._isArrayBuffer)new Uint8Array(this.buffer,a,f).set(d);else for(var g=0;f>g;g++)this.buffer[a+g]=d[g];this._offset=a-this.byteOffset+f}},setBytes:function(a,b,d){this._setBytes(a,b,c(d,!0))},getString:function(a,b,c){var d=this._getBytes(a,b,!0),e="";a=d.length;for(var f=0;a>f;f++)e+=String.fromCharCode(d[f]);return"utf8"===c&&(e=decodeURIComponent(escape(e))),e},setString:function(a,b,c){"utf8"===c&&(b=unescape(encodeURIComponent(b))),this._setBytes(a,e(b),!0)},getChar:function(a){return this.getString(1,a)},setChar:function(a,b){this.setString(a,b)},tell:function(){return this._offset},seek:function(a){return this._checkBounds(a,0),this._offset=a},skip:function(a){return this.seek(this._offset+a)},slice:function(a,b,e){function f(a,b){return 0>a?a+b:a}return a=f(a,this.byteLength),b=f(c(b,this.byteLength),this.byteLength),e?new d(this.getBytes(b-a,a,!0,!0),void 0,void 0,this._littleEndian):new d(this.buffer,this.byteOffset+a,b-a,this._littleEndian)},alignBy:function(a){return this._bitOffset=0,1!==c(a,1)?this.skip(a-(this._offset%a||a)):this._offset},_getFloat64:function(a,b){var c=this._getBytes(8,a,b),d=1-2*(c[7]>>7),e=((c[7]<<1&255)<<3|c[6]>>4)-1023,g=(15&c[6])*f(48)+c[5]*f(40)+c[4]*f(32)+c[3]*f(24)+c[2]*f(16)+c[1]*f(8)+c[0];return 1024===e?0!==g?0/0:1/0*d:-1023===e?d*g*f(-1074):d*(1+g*f(-52))*f(e)},_getFloat32:function(a,b){var c=this._getBytes(4,a,b),d=1-2*(c[3]>>7),e=(c[3]<<1&255|c[2]>>7)-127,g=(127&c[2])<<16|c[1]<<8|c[0];return 128===e?0!==g?0/0:1/0*d:-127===e?d*g*f(-149):d*(1+g*f(-23))*f(e)},_get64:function(a,b,d){d=c(d,this._littleEndian),b=c(b,this._offset);for(var e=d?[0,4]:[4,0],f=0;2>f;f++)e[f]=this.getUint32(b+e[f],d);return this._offset=b+8,new a(e[0],e[1])},getInt64:function(a,b){return this._get64(h,a,b)},getUint64:function(a,b){return this._get64(g,a,b)},_getInt32:function(a,b){var c=this._getBytes(4,a,b);return c[3]<<24|c[2]<<16|c[1]<<8|c[0]},_getUint32:function(a,b){return this._getInt32(a,b)>>>0},_getInt16:function(a,b){return this._getUint16(a,b)<<16>>16},_getUint16:function(a,b){var c=this._getBytes(2,a,b);return c[1]<<8|c[0]},_getInt8:function(a){return this._getUint8(a)<<24>>24},_getUint8:function(a){return this._getBytes(1,a)[0]},_getBitRangeData:function(a,b){var d=(c(b,this._offset)<<3)+this._bitOffset,e=d+a,f=d>>>3,g=e+7>>>3,h=this._getBytes(g-f,f,!0),i=0;(this._bitOffset=7&e)&&(this._bitOffset-=8);for(var j=0,k=h.length;k>j;j++)i=i<<8|h[j];return{start:f,bytes:h,wideValue:i}},getSigned:function(a,b){var c=32-a;return this.getUnsigned(a,b)<<c>>c},getUnsigned:function(a,b){var c=this._getBitRangeData(a,b).wideValue>>>-this._bitOffset;return 32>a?c&~(-1<<a):c},_setBinaryFloat:function(a,b,c,d,e){var g,h,i=0>b?1:0,j=~(-1<<d-1),k=1-j;0>b&&(b=-b),0===b?(g=0,h=0):isNaN(b)?(g=2*j+1,h=1):1/0===b?(g=2*j+1,h=0):(g=Math.floor(Math.log(b)/Math.LN2),g>=k&&j>=g?(h=Math.floor((b*f(-g)-1)*f(c)),g+=j):(h=Math.floor(b/f(k-c)),g=0));for(var l=[];c>=8;)l.push(h%256),h=Math.floor(h/256),c-=8;for(g=g<<c|h,d+=c;d>=8;)l.push(255&g),g>>>=8,d-=8;l.push(i<<d|g),this._setBytes(a,l,e)},_setFloat32:function(a,b,c){this._setBinaryFloat(a,b,23,8,c)},_setFloat64:function(a,b,c){this._setBinaryFloat(a,b,52,11,c)},_set64:function(a,b,d,e){d instanceof a||(d=a.fromNumber(d)),e=c(e,this._littleEndian),b=c(b,this._offset);var f=e?{lo:0,hi:4}:{lo:4,hi:0};for(var g in f)this.setUint32(b+f[g],d[g],e);this._offset=b+8},setInt64:function(a,b,c){this._set64(h,a,b,c)},setUint64:function(a,b,c){this._set64(g,a,b,c)},_setUint32:function(a,b,c){this._setBytes(a,[255&b,b>>>8&255,b>>>16&255,b>>>24],c)},_setUint16:function(a,b,c){this._setBytes(a,[255&b,b>>>8&255],c)},_setUint8:function(a,b){this._setBytes(a,[255&b])},setUnsigned:function(a,b,c){var d=this._getBitRangeData(c,a),e=d.wideValue,f=d.bytes;e&=~(~(-1<<c)<<-this._bitOffset),e|=(32>c?b&~(-1<<c):b)<<-this._bitOffset;for(var g=f.length-1;g>=0;g--)f[g]=255&e,e>>>=8;this._setBytes(d.start,f,!0)}};for(var m in k)!function(a){l["get"+a]=function(b,c){return this._action(a,!0,b,c)},l["set"+a]=function(b,c,d){this._action(a,!1,b,d,c)}}(m);l._setInt32=l._setUint32,l._setInt16=l._setUint16,l._setInt8=l._setUint8,l.setSigned=l.setUnsigned;for(var n in l)"set"===n.slice(0,3)&&!function(a){l["write"+a]=function(){Array.prototype.unshift.call(arguments,void 0),this["set"+a].apply(this,arguments)}}(n.slice(3));if("undefined"!=typeof module&&"object"==typeof module.exports)module.exports=d;else if("function"==typeof define&&define.amd)define([],function(){return d});else{var o=a.jDataView;(a.jDataView=d).noConflict=function(){return a.jDataView=o,this}}}(function(){return this}());
//# sourceMappingURL=jdataview.js.map