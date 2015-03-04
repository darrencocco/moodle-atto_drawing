YUI.add("moodle-atto_racs-drawing-button",function(e,t){var n="atto_racs-drawing",r="atto_racs-drawing",i={DRAWLINE:"atto_racs-drawing_drawline",ERASER:"atto_racs-drawing_eraser",CANVAS:"atto_racs-drawing_canvas",DONE:"atto_racs-drawing_done",INPUTALT:"atto_racs-drawing_inputalt",INPUTSIZE:"atto_racs-drawing_inputsize",INPUTHEIGHT:"atto_racs-drawing_inputheight"},s={ISPERCENT:/\d+%/},o='<form class="atto_form"><button class="{{CSS.DRAWLINE}}" type="button">{{get_string "draw_line" component}}</button><button class="{{CSS.ERASER}}" type="button">{{get_string "eraser" component}}</button><canvas class="{{CSS.CANVAS}}" width="800" height="600"></canvas><button class="{{CSS.DONE}} type="button">{{get_string "save_complete" component}}</button><input type="hidden" class={{CSS.INPUTALT}} value="" id="{{elementid}}_{{CSS.INPUTALT}} /><input type="hidden" class={{CSS.INPUTSIZE}} value="" id="{{elementid}}_{{CSS.INPUTSIZE}} /><input type="hidden" class={{CSS.INPUTHEIGHT}} value="" id="{{elementid}}_{{CSS.INPUTHEIGHT}} /><input type="hidden" class={{CSS.INPUTALT}} value="" id="{{elementid}}_{{CSS.INPUTALT}} /></form>',u='<img src="{{url}}" alt="{{alt}}" {{#if width}}width="{{width}}" {{/if}}{{#if height}}height="{{height}}" {{/if}}{{#if presentation}}role="presentation" {{/if}}style="{{alignment}}{{margin}}{{customstyle}}"{{#if classlist}}class="{{classlist}}" {{/if}}/>';e.namespace("M.atto_racs-drawing").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_currentSelection:null,_selectedImage:null,_form:null,_rawImageDimensions:null,initializer:function(){this.addButton({icon:"e/insert_edit_image",callback:this._displayDialogue,tags:"drawing",tagMatchRequiresAll:!1})},_displayDialogue:function(){this._currentSelection=this.get("host").getSelection();if(this._currentSelection===!1)return;this._rawImageDimensions=null;var e=this.getDialogue({headerContent:M.util.get_string("imageproperties",n),width:"900px",focusAfterHide:!0,focusOnShowSelector:SELECTORS.INPUTURL});e.set("bodyContent",this._getDialogueContent()).show()},_getDialogueContent:function(){var t=e.Handlebars.compile(TEMPLATE),r=e.Node.create(t({elementid:this.get("host").get("elementid"),CSS:i,component:n}));return this._form=r,this._applyImageProperties(this._form),this._form.one("."+i.DRAWLINE).on("click",this._drawLineEnabled,this,"#000000"),this._form.one("."+i.ERASER).on("click",this._drawLineEnabled,this,"#FFFFFF"),this._form.one("."+i.DONE).on("click",this._setImage,this),r},_applyImageProperties:function(e){var t=this._getSelectedImageProperties(),n=e.one("."+i.IMAGEPREVIEW),r;if(t===!1){n.setStyle("display","none");for(r in ALIGNMENTS)ALIGNMENTS[r].isDefault===!0&&(css=ALIGNMENTS[r].value+":"+ALIGNMENTS[r].name+";",e.one("."+i.INPUTALIGNMENT).set("value",css));return}t.align&&e.one("."+i.INPUTALIGNMENT).set("value",t.align),t.width&&e.one("."+i.INPUTWIDTH).set("value",t.width),t.height&&e.one("."+i.INPUTHEIGHT).set("value",t.height),t.alt&&e.one("."+i.INPUTALT).set("value",t.alt);if(t.src){var s=new Image;s.src=t.src,e.one("."+i.INPUTURL).getContext("2d").drawImage(s,0,0),this._loadPreviewImage(t.src)}t.presentation&&e.one("."+i.IMAGEPRESENTATION).set("checked","checked"),this._autoAdjustSize()},_setImage:function(t){var n=this._form,r=n.one("."+i.CANVAS).toDataURL(),o=n.one("."+i.INPUTALT).get("value"),a=n.one("."+i.INPUTWIDTH).get("value"),f=n.one("."+i.INPUTHEIGHT).get("value"),l=n.one("."+i.INPUTALIGNMENT).get("value"),c="",h,p="",d,v=[],m=this.get("host");t.preventDefault(),m.focus(),this._selectedImage?m.setSelection(m.getSelectionFromNode(this._selectedImage)):m.setSelection(this._currentSelection);for(d in ALIGNMENTS)css=ALIGNMENTS[d].value+":"+ALIGNMENTS[d].name+";",l===css&&(c=" margin: "+ALIGNMENTS[d].margin+";");if(!a.match(s.ISPERCENT)&&isNaN(parseInt(a,10))){n.one("."+i.INPUTWIDTH).focus();return}if(!f.match(s.ISPERCENT)&&isNaN(parseInt(f,10))){n.one("."+i.INPUTHEIGHT).focus();return}template=e.Handlebars.compile(u),h=template({url:r,alt:o,width:a,height:f,alignment:l,margin:c,classlist:v.join(" ")}),this.get("host").insertContentAtFocusPoint(h),this.markUpdated(),this.getDialogue({focusAfterHide:null}).hide()},_getSelectedImageProperties:function(){var e={src:null,alt:null,width:null,height:null,align:"",presentation:!1},t=this.get("host").getSelectedNodes(),n,r,i,o,u;t&&(t=t.filter("img"));if(t&&t.size()){image=t.item(0),this._selectedImage=image,o=image.getAttribute("style"),e.customstyle=o,o=o.replace(/ /g,""),r=image.getAttribute("width"),r.match(s.ISPERCENT)||(r=parseInt(r,10)),i=image.getAttribute("height"),i.match(s.ISPERCENT)||(i=parseInt(i,10)),r!==0&&(e.width=r),i!==0&&(e.height=i);for(n in ALIGNMENTS){u=ALIGNMENTS[n].value+":"+ALIGNMENTS[n].name+";";if(o.indexOf(u)!==-1){margin="margin:"+ALIGNMENTS[n].margin+";",margin=margin.replace(/ /g,"");if(o.indexOf(margin)!==-1){e.align=u;break}}}return e.src=image.getAttribute("src"),e.alt=image.getAttribute("alt")||"",e.presentation=image.get("role")==="presentation",e}return this._selectedImage=null,!1}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});
