/*! Scroller 1.4.1
 * ©2011-2016 SpryMedia Ltd - datatables.net/license
 */
(function(a){a(jQuery,window,document)}(function(f,d,a,g){var e=f.fn.dataTable;var c=function(i,h){if(!(this instanceof c)){alert("Scroller warning: Scroller must be initialised with the 'new' keyword.");return}if(h===g){h={}}this.s={dt:f.fn.dataTable.Api(i).settings()[0],tableTop:0,tableBottom:0,redrawTop:0,redrawBottom:0,autoHeight:true,viewportRows:0,stateTO:null,drawTO:null,heights:{jump:null,page:null,virtual:null,scroll:null,row:null,viewport:null},topRowFloat:0,scrollDrawDiff:null,loaderVisible:false};this.s=f.extend(this.s,c.oDefaults,h);this.s.heights.row=this.s.rowHeight;this.dom={force:a.createElement("div"),scroller:null,table:null,loader:null};if(this.s.dt.oScroller){return}this.s.dt.oScroller=this;this._fnConstruct()};f.extend(c.prototype,{fnRowToPixels:function(h,k,j){var l;if(j){l=this._domain("virtualToPhysical",h*this.s.heights.row)}else{var i=h-this.s.baseRowTop;l=this.s.baseScrollTop+(i*this.s.heights.row)}return k||k===g?parseInt(l,10):l},fnPixelsToRow:function(l,j,i){var h=l-this.s.baseScrollTop;var k=i?this._domain("physicalToVirtual",l)/this.s.heights.row:(h/this.s.heights.row)+this.s.baseRowTop;return j||j===g?parseInt(k,10):k},fnScrollToRow:function(n,m){var l=this;var i=false;var k=this.fnRowToPixels(n);var h=((this.s.displayBuffer-1)/2)*this.s.viewportRows;var j=n-h;if(j<0){j=0}if((k>this.s.redrawBottom||k<this.s.redrawTop)&&this.s.dt._iDisplayStart!==j){i=true;k=this.fnRowToPixels(n,false,true)}if(typeof m=="undefined"||m){this.s.ani=i;f(this.dom.scroller).animate({scrollTop:k},function(){setTimeout(function(){l.s.ani=false},25)})}else{f(this.dom.scroller).scrollTop(k)}},fnMeasure:function(i){if(this.s.autoHeight){this._fnCalcRowHeight()}var h=this.s.heights;if(h.row){h.viewport=f(this.dom.scroller).height();this.s.viewportRows=parseInt(h.viewport/h.row,10)+1;this.s.dt._iDisplayLength=this.s.viewportRows*this.s.displayBuffer}if(i===g||i){this.s.dt.oInstance.fnDraw(false)}},fnPageInfo:function(){var j=this.s.dt,i=this.dom.scroller.scrollTop,k=j.fnRecordsDisplay(),h=Math.ceil(this.fnPixelsToRow(i+this.s.heights.viewport,false,this.s.ani));return{start:Math.floor(this.fnPixelsToRow(i,false,this.s.ani)),end:k<h?k-1:h-1}},_fnConstruct:function(){var h=this;if(!this.s.dt.oFeatures.bPaginate){this.s.dt.oApi._fnLog(this.s.dt,0,"Pagination must be enabled for Scroller");return}this.dom.force.style.position="relative";this.dom.force.style.top="0px";this.dom.force.style.left="0px";this.dom.force.style.width="1px";this.dom.scroller=f("div."+this.s.dt.oClasses.sScrollBody,this.s.dt.nTableWrapper)[0];this.dom.scroller.appendChild(this.dom.force);this.dom.scroller.style.position="relative";this.dom.table=f(">table",this.dom.scroller)[0];this.dom.table.style.position="absolute";this.dom.table.style.top="0px";this.dom.table.style.left="0px";f(this.s.dt.nTableWrapper).addClass("DTS");if(this.s.loadingIndicator){this.dom.loader=f('<div class="dataTables_processing DTS_Loading">'+this.s.dt.oLanguage.sLoadingRecords+"</div>").css("display","none");f(this.dom.scroller.parentNode).css("position","relative").append(this.dom.loader)}if(this.s.heights.row&&this.s.heights.row!="auto"){this.s.autoHeight=false}this.fnMeasure(false);this.s.ingnoreScroll=true;this.s.stateSaveThrottle=this.s.dt.oApi._fnThrottle(function(){h.s.dt.oApi._fnSaveState(h.s.dt)},500);f(this.dom.scroller).on("scroll.DTS",function(j){h._fnScroll.call(h)});f(this.dom.scroller).on("touchstart.DTS",function(){h._fnScroll.call(h)});this.s.dt.aoDrawCallback.push({fn:function(){if(h.s.dt.bInitialised){h._fnDrawCallback.call(h)}},sName:"Scroller"});f(d).on("resize.DTS",function(){h.fnMeasure(false);h._fnInfo()});var i=true;this.s.dt.oApi._fnCallbackReg(this.s.dt,"aoStateSaveParams",function(j,k){if(i&&h.s.dt.oLoadedState){k.iScroller=h.s.dt.oLoadedState.iScroller;k.iScrollerTopRow=h.s.dt.oLoadedState.iScrollerTopRow;i=false}else{k.iScroller=h.dom.scroller.scrollTop;k.iScrollerTopRow=h.s.topRowFloat}},"Scroller_State");if(this.s.dt.oLoadedState){this.s.topRowFloat=this.s.dt.oLoadedState.iScrollerTopRow||0}f(this.s.dt.nTable).one("init.dt",function(){h.fnMeasure()});this.s.dt.aoDestroyCallback.push({sName:"Scroller",fn:function(){f(d).off("resize.DTS");f(h.dom.scroller).off("touchstart.DTS scroll.DTS");f(h.s.dt.nTableWrapper).removeClass("DTS");f("div.DTS_Loading",h.dom.scroller.parentNode).remove();f(h.s.dt.nTable).off("init.dt");h.dom.table.style.position="";h.dom.table.style.top="";h.dom.table.style.left=""}})},_fnScroll:function(){var k=this,l=this.s.heights,j=this.dom.scroller.scrollTop,m;if(this.s.skip){return}if(this.s.ingnoreScroll){return}if(this.s.dt.bFiltered||this.s.dt.bSorted){this.s.lastScrollTop=0;return}this._fnInfo();clearTimeout(this.s.stateTO);this.s.stateTO=setTimeout(function(){k.s.dt.oApi._fnSaveState(k.s.dt)},250);if(j<this.s.redrawTop||j>this.s.redrawBottom){var i=Math.ceil(((this.s.displayBuffer-1)/2)*this.s.viewportRows);if(Math.abs(j-this.s.lastScrollTop)>l.viewport||this.s.ani){m=parseInt(this._domain("physicalToVirtual",j)/l.row,10)-i;this.s.topRowFloat=(this._domain("physicalToVirtual",j)/l.row)}else{m=this.fnPixelsToRow(j)-i;this.s.topRowFloat=this.fnPixelsToRow(j,false)}if(m<=0){m=0}else{if(m+this.s.dt._iDisplayLength>this.s.dt.fnRecordsDisplay()){m=this.s.dt.fnRecordsDisplay()-this.s.dt._iDisplayLength;if(m<0){m=0}}else{if(m%2!==0){m++}}}if(m!=this.s.dt._iDisplayStart){this.s.tableTop=f(this.s.dt.nTable).offset().top;this.s.tableBottom=f(this.s.dt.nTable).height()+this.s.tableTop;var h=function(){if(k.s.scrollDrawReq===null){k.s.scrollDrawReq=j}k.s.dt._iDisplayStart=m;k.s.dt.oApi._fnDraw(k.s.dt)};if(this.s.dt.oFeatures.bServerSide){clearTimeout(this.s.drawTO);this.s.drawTO=setTimeout(h,this.s.serverWait)}else{h()}if(this.dom.loader&&!this.s.loaderVisible){this.dom.loader.css("display","block");this.s.loaderVisible=true}}}this.s.lastScrollTop=j;this.s.stateSaveThrottle()},_domain:function(i,l){var k=this.s.heights;var h;if(k.virtual===k.scroll){return l}var m=(k.scroll-k.viewport)/2;var j=(k.virtual-k.viewport)/2;h=j/(m*m);if(i==="virtualToPhysical"){if(l<j){return Math.pow(l/h,0.5)}else{l=(j*2)-l;return l<0?k.scroll:(m*2)-Math.pow(l/h,0.5)}}else{if(i==="physicalToVirtual"){if(l<m){return l*l*h}else{l=(m*2)-l;return l<0?k.virtual:(j*2)-(l*l*h)}}}},_fnDrawCallback:function(){var l=this,m=this.s.heights,k=this.dom.scroller.scrollTop,r=k,i=k+m.viewport,p=f(this.s.dt.nTable).height(),s=this.s.dt._iDisplayStart,j=this.s.dt._iDisplayLength,h=this.s.dt.fnRecordsDisplay();this.s.skip=true;this._fnScrollForce();if(s===0){k=this.s.topRowFloat*m.row}else{if(s+j>=h){k=m.scroll-((h-this.s.topRowFloat)*m.row)}else{k=this._domain("virtualToPhysical",this.s.topRowFloat*m.row)}}this.dom.scroller.scrollTop=k;this.s.baseScrollTop=k;this.s.baseRowTop=this.s.topRowFloat;var q=k-((this.s.topRowFloat-s)*m.row);if(s===0){q=0}else{if(s+j>=h){q=m.scroll-p}}this.dom.table.style.top=q+"px";this.s.tableTop=q;this.s.tableBottom=p+this.s.tableTop;var o=(k-this.s.tableTop)*this.s.boundaryScale;this.s.redrawTop=k-o;this.s.redrawBottom=k+o;this.s.skip=false;if(this.s.dt.oFeatures.bStateSave&&this.s.dt.oLoadedState!==null&&typeof this.s.dt.oLoadedState.iScroller!="undefined"){var n=(this.s.dt.sAjaxSource||l.s.dt.ajax)&&!this.s.dt.oFeatures.bServerSide?true:false;if((n&&this.s.dt.iDraw==2)||(!n&&this.s.dt.iDraw==1)){setTimeout(function(){f(l.dom.scroller).scrollTop(l.s.dt.oLoadedState.iScroller);l.s.redrawTop=l.s.dt.oLoadedState.iScroller-(m.viewport/2);setTimeout(function(){l.s.ingnoreScroll=false},0)},0)}}else{l.s.ingnoreScroll=false}if(this.s.dt.oFeatures.bInfo){setTimeout(function(){l._fnInfo.call(l)},0)}if(this.dom.loader&&this.s.loaderVisible){this.dom.loader.css("display","none");this.s.loaderVisible=false}},_fnScrollForce:function(){var i=this.s.heights;var h=1000000;i.virtual=i.row*this.s.dt.fnRecordsDisplay();i.scroll=i.virtual;if(i.scroll>h){i.scroll=h}this.dom.force.style.height=i.scroll>this.s.heights.row?i.scroll+"px":this.s.heights.row+"px"},_fnCalcRowHeight:function(){var l=this.s.dt;var h=l.nTable;var k=h.cloneNode(false);var j=f("<tbody/>").appendTo(k);var i=f('<div class="'+l.oClasses.sWrapper+' DTS"><div class="'+l.oClasses.sScrollWrapper+'"><div class="'+l.oClasses.sScrollBody+'"></div></div></div>');f("tbody tr:lt(4)",h).clone().appendTo(j);while(f("tr",j).length<3){j.append("<tr><td>&nbsp;</td></tr>")}f("div."+l.oClasses.sScrollBody,i).append(k);var m=this.s.dt.nHolding||h.parentNode;if(!f(m).is(":visible")){m="body"}i.appendTo(m);this.s.heights.row=f("tr",j).eq(1).outerHeight();i.remove()},_fnInfo:function(){if(!this.s.dt.oFeatures.bInfo){return}var k=this.s.dt,u=k.oLanguage,p=this.dom.scroller.scrollTop,h=Math.floor(this.fnPixelsToRow(p,false,this.s.ani)+1),q=k.fnRecordsTotal(),v=k.fnRecordsDisplay(),r=Math.ceil(this.fnPixelsToRow(p+this.s.heights.viewport,false,this.s.ani)),z=v<r?v:r,j=k.fnFormatNumber(h),o=k.fnFormatNumber(z),x=k.fnFormatNumber(q),w=k.fnFormatNumber(v),t;if(k.fnRecordsDisplay()===0&&k.fnRecordsDisplay()==k.fnRecordsTotal()){t=u.sInfoEmpty+u.sInfoPostFix}else{if(k.fnRecordsDisplay()===0){t=u.sInfoEmpty+" "+u.sInfoFiltered.replace("_MAX_",x)+u.sInfoPostFix}else{if(k.fnRecordsDisplay()==k.fnRecordsTotal()){t=u.sInfo.replace("_START_",j).replace("_END_",o).replace("_MAX_",x).replace("_TOTAL_",w)+u.sInfoPostFix}else{t=u.sInfo.replace("_START_",j).replace("_END_",o).replace("_MAX_",x).replace("_TOTAL_",w)+" "+u.sInfoFiltered.replace("_MAX_",k.fnFormatNumber(k.fnRecordsTotal()))+u.sInfoPostFix}}}var y=u.fnInfoCallback;if(y){t=y.call(k.oInstance,k,h,z,q,v,t)}var m=k.aanFeatures.i;if(typeof m!="undefined"){for(var s=0,l=m.length;s<l;s++){f(m[s]).html(t)}}}});c.defaults={trace:false,rowHeight:"auto",serverWait:200,displayBuffer:9,boundaryScale:0.5,loadingIndicator:false};c.oDefaults=c.defaults;c.version="1.4.1";if(typeof f.fn.dataTable=="function"&&typeof f.fn.dataTableExt.fnVersionCheck=="function"&&f.fn.dataTableExt.fnVersionCheck("1.10.0")){f.fn.dataTableExt.aoFeatures.push({fnInit:function(j){var i=j.oInit;var h=i.scroller||i.oScroller||{};new c(j,h)},cFeature:"S",sFeature:"Scroller"})}else{alert("Warning: Scroller requires DataTables 1.10.0 or greater - www.datatables.net/download")}f(a).on("preInit.dt.dtscroller",function(k,h){if(k.namespace!=="dt"){return}var l=h.oInit.scroller;var j=e.defaults.scroller;if(l||j){var i=f.extend({},l,j);if(l!==false){new c(h,i)}}});f.fn.dataTable.Scroller=c;f.fn.DataTable.Scroller=c;var b=f.fn.dataTable.Api;b.register("scroller()",function(){return this});b.register("scroller().rowToPixels()",function(i,k,j){var h=this.context;if(h.length&&h[0].oScroller){return h[0].oScroller.fnRowToPixels(i,k,j)}});b.register("scroller().pixelsToRow()",function(k,j,i){var h=this.context;if(h.length&&h[0].oScroller){return h[0].oScroller.fnPixelsToRow(k,j,i)}});b.register("scroller().scrollToRow()",function(i,h){this.iterator("table",function(j){if(j.oScroller){j.oScroller.fnScrollToRow(i,h)}});return this});b.register("row().scrollTo()",function(h){var i=this;this.iterator("row",function(j,k){if(j.oScroller){var l=i.rows({order:"applied",search:"applied"}).indexes().indexOf(k);j.oScroller.fnScrollToRow(l,h)}});return this});b.register("scroller.measure()",function(h){this.iterator("table",function(i){if(i.oScroller){i.oScroller.fnMeasure(h)}});return this});b.register("scroller.page()",function(){var h=this.context;if(h.length&&h[0].oScroller){return h[0].oScroller.fnPageInfo()}});return c}));