// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @package    atto_racsdrawing
 * @copyright  2015 Darren Cocco - Royal Australasian College of Surgeons  <darren.cocco@surgeons.org>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 * Attribution Damyon Wiese - Atto image editor plugin used as base
 */

/**
 * Atto text editor drawing plugin.
 */

/**
 * Atto drawing plugin.
 *
 * @namespace M.atto_racsdrawing
 * @class Button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_racsdrawing',
    CSS = {
        DRAWLINE: 'atto_racsdrawing_drawline',
        ERASER: 'atto_racsdrawing_eraser',
        LAYERSYSTEM: 'atto_racsdrawing_layersystem',
        CANVAS1: 'atto_racsdrawing_canvas1',
        CANVAS2: 'atto_racsdrawing_canvas2',
        SAVE: 'atto_racsdrawing_save',
        INPUTALT: 'atto_racsdrawing_inputalt',
        INPUTWIDTH: 'atto_racsdrawing_inputwidth',
        INPUTHEIGHT: 'atto_racsdrawing_inputheight',
        INPUTALIGNMENT: 'atto_racsdrawing_inputalignment',
        TOOLS: 'atto_racsdrawing_toolspallet',
        FORM: 'atto_racsdrawing_form',
        TOOLSGROUP: 'atto_racsdrawing_tools',
        BRUSHSIZEGROUP: 'atto_racsdrawing_brushes',
        BRUSH1: 'atto_racsdrawing_brush1',
        BRUSH2: 'atto_racsdrawing_brush2',
        BRUSH3: 'atto_racsdrawing_brush3',
        BRUSH4: 'atto_racsdrawing_brush4',
        ICON: 'atto_racsdrawing_toolpalleticon',
        PALLETSECTIONTITLE: 'atto_racsdrawing_toolpallettitle',
        COLOURGROUP: 'atto_racsdrawing_colours',
        COLOUR: 'atto_racsdrawing_colour',
        COLOUR1: 'atto_racsdrawing_colour1',
        COLOUR2: 'atto_racsdrawing_colour2',
        COLOUR3: 'atto_racsdrawing_colour3',
        COLOUR4: 'atto_racsdrawing_colour4',
        COLOUR5: 'atto_racsdrawing_colour5',
        COLOUR6: 'atto_racsdrawing_colour6',
        COLOUR7: 'atto_racsdrawing_colour7',
        COLOUR8: 'atto_racsdrawing_colour8',
        SELECTEDCOLOUR: 'atto_racsdrawing_colour_selected',
        SELECTEDTOOL: 'atto_racsdrawing_tool_selected',
        BRUSH: 'atto_racsdrawing_brush',
        SELECTEDBRUSHSIZE: 'atto_racsdrawing_brush_selected',
        TOOL: 'atto_racsdrawing_tool',
        TEXTINPUTCONTAINER: 'atto_racsdrawing_textinputcontainer',
        TEXTINPUTFIELD: 'atto_racsdrawing_textinputfield'
    },
    REGEX = {
            ISPERCENT: /\d+%/
        },
    ALIGNMENTS = [
                  // Vertical alignment.
                  {
                      name: 'text-top',
                      str: 'alignment_top',
                      value: 'vertical-align',
                      margin: '0 .5em'
                  }, {
                      name: 'middle',
                      str: 'alignment_middle',
                      value: 'vertical-align',
                      margin: '0 .5em'
                  }, {
                      name: 'text-bottom',
                      str: 'alignment_bottom',
                      value: 'vertical-align',
                      margin: '0 .5em',
                      isDefault: true
                  },

                  // Floats.
                  {
                      name: 'left',
                      str: 'alignment_left',
                      value: 'float',
                      margin: '0 .5em 0 0'
                  }, {
                      name: 'right',
                      str: 'alignment_right',
                      value: 'float',
                      margin: '0 0 0 .5em'
                  }, {
                      name: 'customstyle',
                      str: 'customstyle',
                      value: 'style'
                  }
              ],
    TEMPLATE = '' +
                '<form class="{{CSS.FORM}} atto_form">' +
                    '<div class="{{CSS.LAYERSYSTEM}}">' +
                        '<canvas class="{{CSS.CANVAS1}}" width="800" height="600"></canvas>' +
                        '<canvas class="{{CSS.CANVAS2}}" width="800" height="600"></canvas>' +
                    '</div>' +
                    '<div class="{{CSS.TOOLS}}">' +
                        '<div class="{{CSS.TOOLSGROUP}}">' +
                            '<h4 class="{{CSS.PALLETSECTIONTITLE}}">{{get_string "title_tools" component}}</h4>' +
                            '<table><tbody>' +
                            '<tr><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<img class="{{CSS.TOOL}} {{CSS.DRAWLINE}}" data-tool="draw" src="{{image_url "pencil" component}}" title="{{get_string "pencil" component}}"/>'+
                            '</div>' +
                            '</td><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<img class="{{CSS.TOOL}} {{CSS.ERASER}}" data-tool="erase" src="{{image_url "eraser" component}}" title="{{get_string "eraser" component}}"/>' +
                            '</div>' +
                            '</td</tr>' +
                            '<tr><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<img class="{{CSS.TOOL}} {{CSS.TEXT}}" data-tool="text" src="{{image_url "entertext" component}}"  title="{{get_string "enter_text" component}}"/>' +
                            '</div>' +
                            '</td><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<img class="{{CSS.TOOL}} {{CSS.BOX}}" data-tool="box" src="{{image_url "drawbox" component}}" title="{{get_string "draw_box" component}}"/>' +
                            '</div>' +
                            '</td</tr>' +
                            '<tr><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<img class="{{CSS.TOOL}} {{CSS.SAVE}}" data-tool="save" src="{{image_url "save" component}}" title="{{get_string "save" component}}"/>' +
                            '</div>' +
                            '</td><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<img class="{{CSS.TOOL}} {{CSS.CANCEL}}" data-tool="cancel" src="{{image_url "cancel" component}}" title="{{get_string "cancel" component}}"/>' +
                            '</div>' +
                            '</td</tr>' +
                            '</tbody></table>' +
                        '</div>' +
                        '<div class="{{CSS.BRUSHSIZEGROUP}}">' +
                            '<h4 class="{{CSS.PALLETSECTIONTITLE}}">{{get_string "title_tool_sizes" component}}</h4>' +
                            '<table><tbody>' +
                            '<tr><td>' +
                            '<div class="{{CSS.ICON}}" title="{{get_string "brush1" component}}">' +
                                '<div class="{{CSS.BRUSH}} {{CSS.BRUSH1}}" title="{{get_string "brush1" component}}"></div>' +
                            '</button>' +
                            '</td><td>' +
                            '<div class="{{CSS.ICON}}" title="{{get_string "brush2" component}}">' +
                                '<div class="{{CSS.BRUSH}} {{CSS.BRUSH2}}" title="{{get_string "brush2" component}}"></div>' +
                            '</div>' +
                            '</td</tr>' +
                            '<tr><td>' +
                            '<div class="{{CSS.ICON}}" title="{{get_string "brush3" component}}">' +
                                '<div class="{{CSS.BRUSH}} {{CSS.BRUSH3}}" title="{{get_string "brush3" component}}"></div>' +
                            '</div>' +
                            '</td><td>' +
                            '<div class="{{CSS.ICON}}" title="{{get_string "brush4" component}}">' +
                                '<div class="{{CSS.BRUSH}} {{CSS.BRUSH4}}" title="{{get_string "brush4" component}}"></div>' +
                            '</div>' +
                            '</td</tr>' +
                            '</tbody></table>' +
                        '</div>' +
                        '<div class="{{CSS.COLOURGROUP}}">' +
                            '<h4 class="{{CSS.PALLETSECTIONTITLE}}">{{get_string "title_colours" component}}</h4>' +
                            '<table><tbody>' +
                            '<tr><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<div class="{{CSS.COLOUR}} {{CSS.COLOUR1}}" title="{{get_string "colour1" component}}"></div>' +
                            '</div>' +
                            '</td><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<div class="{{CSS.COLOUR}} {{CSS.COLOUR2}}" title="{{get_string "colour2" component}}"></div>' +
                            '</div>' +
                            '</td</tr>' +
                            '<tr><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<div class="{{CSS.COLOUR}} {{CSS.COLOUR3}}" title="{{get_string "colour3" component}}"></div>' +
                            '</div>' +
                            '</td><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<div class="{{CSS.COLOUR}} {{CSS.COLOUR4}}" title="{{get_string "colour4" component}}"></div>' +
                            '</div>' +
                            '</td</tr>' +
                            '<tr><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<div class="{{CSS.COLOUR}} {{CSS.COLOUR5}}" title="{{get_string "colour5" component}}"></div>' +
                            '</div>' +
                            '</td><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<div class="{{CSS.COLOUR}} {{CSS.COLOUR6}}" title="{{get_string "colour6" component}}"></div>' +
                            '</div>' +
                            '</td</tr>' +
                            '<tr><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<div class="{{CSS.COLOUR}} {{CSS.COLOUR7}}" title="{{get_string "colour7" component}}"></div>' +
                            '</div>' +
                            '</td><td>' +
                            '<div class="{{CSS.ICON}}">' +
                                '<div class="{{CSS.COLOUR}} {{CSS.COLOUR8}}" title="{{get_string "colour8" component}}"></div>' +
                            '</div>' +
                            '</td</tr>' +
                            '</tbody></table>' +
                        '</div>' +
                    '</div>' +
                    '<input type="hidden" class="{{CSS.INPUTALT}}" value="" id="{{elementid}}_{{CSS.INPUTALT}}" />' +
                    '<input type="hidden" class="{{CSS.INPUTWIDTH}}" value="" id="{{elementid}}_{{CSS.INPUTWIDTH}}" />' +
                    '<input type="hidden" class="{{CSS.INPUTHEIGHT}}" value="" id="{{elementid}}_{{CSS.INPUTHEIGHT}}" />' +
                    '<input type="hidden" class="{{CSS.INPUTALIGNMENT}}" value="" id="{{elementid}}_{{CSS.INPUTALIGNMENT}}" />' +
                '</form>',
    IMAGETEMPLATE = '' +
                '<img src="{{url}}" alt="{{alt}}" ' +
                    '{{#if width}}width="{{width}}" {{/if}}' +
                    '{{#if height}}height="{{height}}" {{/if}}' +
                    '{{#if presentation}}role="presentation" {{/if}}' +
                    'style="{{alignment}}{{margin}}{{customstyle}}"' +
                    '{{#if classlist}}class="{{classlist}}" {{/if}}' +
                '/>',
    TEXTEDITORTEMPLATE = '' +
                '<div class="{{CSS.TEXTINPUTCONTAINER}}" style="top:{{top}};left:{{left}};">' +
                    '<input type="text" class="{{CSS.TEXTINPUTFIELD}}">' +
                '</div>';


Y.namespace('M.atto_racsdrawing').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

    /**
     * The most recently selected image.
     *
     * @param _selectedImage
     * @type Node
     * @private
     */
    _selectedImage: null,

    /**
     * A reference to the currently open form.
     *
     * @param _form
     * @type Node
     * @private
     */
    _form: null,

    /**
     * The last recorded relative position of the mouse
     * cursor inside the canvas element.
     *
     * @param _mouse
     * @type Object
     * @private
     */
    _mouse: {
        x: null,
        y: null
    },

    /**
     * Used to keep track of the the last position
     * the mouse was encountered at that the mouse
     * button was depressed at.
     *
     * @param _lastMouse
     * @type Object
     * @private
     */
    _lastMouse: {
        x: null,
        y: null
    },

    /**
     * The size of the stroke to draw with
     *
     * @param _strokeWidth
     * @type Number
     * @private
     */
    _strokeWidth: null,

    /**
     * The current colour the drawing tool is set too
     *
     * @param _strokeColour
     * @type String
     * @private
     */
    _strokeColour: null,

    /**
     * The colour to be used for drawing actions.
     *
     * @param _colour
     * @type String
     * @private
     */
    _colour: null,

    /**
     * The currently selected tool.
     *
     * @param _selectedTool
     * @type String
     * @private
     */
    _selectedTool: null,

    initializer: function() {
        this.addButton({
            icon: 'icon',
            iconComponent: COMPONENTNAME,
            callback: this._displayDialogue,
            tags: 'drawing',
            tagMatchRequiresAll: false
        });
    },

    /**
     * Display the drawing tool.
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function() {
        // Store the current selection.
        this._currentSelection = this.get('host').getSelection();
        if (this._currentSelection === false) {
            return;
        }

        // Reset the image dimensions.
        this._rawImageDimensions = null;

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
            width: 'auto',
            focusAfterHide: true
        });

        // Set the dialogue content, and then show the dialogue.
        dialogue.set('bodyContent', this._getDialogueContent())
                .show();
    },

    /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getDialogueContent: function() {
        var template = Y.Handlebars.compile(TEMPLATE),
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                CSS: CSS,
                component: COMPONENTNAME
            }));

        this._form = content;

        // Configure the view of the current image.
        this._applyImageProperties(this._form);

        this._strokeWidth = null;
        this._strokeColour = null;

        this._form.all('.' + CSS.TOOL).each(function(node) {
            node.ancestor().on('click', this._eventSetTool, this, node);
        }, this);
        this._form.all('.' + CSS.BRUSH).each(function(node) {
            node.ancestor().on('click', this._eventSetLineWidth, this, node);
        }, this);
        this._form.all('.' + CSS.COLOUR).each(function(node) {
            node.ancestor().on('click', this._eventSetLineColour, this, node);
        }, this);
        
        //Starts drawing process
        this._form.one('.' + CSS.CANVAS2).on('mousedown', this._draw, this);
        //Keeps track of mouse position. Should I attach detach this instead so it only tracks when necessary.
        this._form.one('.' + CSS.CANVAS2).on('mousemove', this._updateMousePosition, this);

        return content;
    },

    /**
     * Applies properties of an existing image to the image dialogue for editing.
     *
     * @method _applyImageProperties
     * @param {Node} form
     * @private
     */
    _applyImageProperties: function(form) {
        var properties = this._getSelectedImageProperties(),
            theImage;

        if (properties === false) {
            return;
        }

        if (properties.align) {
            form.one('.' + CSS.INPUTALIGNMENT).set('value', properties.align);
        }
        if (properties.width) {
            form.one('.' + CSS.INPUTWIDTH).set('value', properties.width);
        }
        if (properties.height) {
            form.one('.' + CSS.INPUTHEIGHT).set('value', properties.height);
        }
        if (properties.alt) {
            form.one('.' + CSS.INPUTALT).set('value', properties.alt);
        }
        if (properties.src) {
            //This should theoritically load the already existing image into the drawing panel.
            theImage = new Image();
            theImage.src = properties.src;
            form.one('.' + CSS.CANVAS1).setAttribute('height', theImage.height);
            form.one('.' + CSS.CANVAS1).setAttribute('width', theImage.width);
            form.one('.' + CSS.CANVAS2).setAttribute('height', theImage.height);
            form.one('.' + CSS.CANVAS2).setAttribute('width', theImage.width);
            form.one('.' + CSS.CANVAS1)._node.getContext('2d').drawImage(theImage, 0, 0);
        }

        // Update the image preview based on the form properties.
        //this._autoAdjustSize();
    },

    /**
     * Update the image in the contenteditable.
     *
     * @method _setImage
     * @private
     */
    _setImage: function() {
        var form = this._form,
            url = form.one('.' + CSS.CANVAS1)._node.toDataURL(),
            alt = form.one('.' + CSS.INPUTALT).get('value'),
            width = form.one('.' + CSS.INPUTWIDTH).get('value'),
            height = form.one('.' + CSS.INPUTHEIGHT).get('value'),
            alignment = form.one('.' + CSS.INPUTALIGNMENT).get('value'),
            margin = '',
            imagehtml,
            i,
            css,
            template,
            classlist = [],
            host = this.get('host');

        // Focus on the editor in preparation for inserting the image.
        host.focus();
        if (this._selectedImage) {
            host.setSelection(host.getSelectionFromNode(this._selectedImage));
        } else {
            host.setSelection(this._currentSelection);
        }

        for (i in ALIGNMENTS) {
            css = ALIGNMENTS[i].value + ':' + ALIGNMENTS[i].name + ';';
            if (alignment === css) {
                margin = ' margin: ' + ALIGNMENTS[i].margin + ';';
            }
        }

        template = Y.Handlebars.compile(IMAGETEMPLATE);
        imagehtml = template({
            url: url,
            alt: alt,
            width: width,
            height: height,
            alignment: alignment,
            margin: margin,
            classlist: classlist.join(' ')
        });

        this.get('host').insertContentAtFocusPoint(imagehtml);

        this.markUpdated();

        this.getDialogue({
            focusAfterHide: null
        }).hide();

    },

    /**
     * Gets the properties of the currently selected image.
     *
     * The first image only if multiple images are selected.
     *
     * @method _getSelectedImageProperties
     * @return {object}
     * @private
     */
    _getSelectedImageProperties: function() {
        var properties = {
                src: null,
                alt :null,
                width: null,
                height: null,
                align: '',
                presentation: false
            },

            // Get the current selection.
            images = this.get('host').getSelectedNodes(),
            i, width, height, style, css, image, margin;

        if (images) {
            images = images.filter('img');
        }

        if (images && images.size()) {
            image = images.item(0);
            this._selectedImage = image;

            style = image.getAttribute('style');
            properties.customstyle = style;
            style = style.replace(/ /g, '');

            width = image.getAttribute('width');
            if (!width.match(REGEX.ISPERCENT)) {
                width = parseInt(width, 10);
            }
            height = image.getAttribute('height');
            if (!height.match(REGEX.ISPERCENT)) {
                height = parseInt(height, 10);
            }

            if (width !== 0) {
                properties.width = width;
            }
            if (height !== 0) {
                properties.height = height;
            }
            for (i in ALIGNMENTS) {
                css = ALIGNMENTS[i].value + ':' + ALIGNMENTS[i].name + ';';
                if (style.indexOf(css) !== -1) {
                    margin = 'margin:' + ALIGNMENTS[i].margin + ';';
                    margin = margin.replace(/ /g, '');
                    // Must match alignment and margins - otherwise custom style is selected.
                    if (style.indexOf(margin) !== -1) {
                        properties.align = css;
                        break;
                    }
                }
            }
            properties.src = image.getAttribute('src');
            properties.alt = image.getAttribute('alt') || '';
            return properties;
        }

        // No image selected - clean up.
        this._selectedImage = null;
        return false;
    },

    /**
     * Starts the "drawing" function depending on what tool
     * is selected
     *
     * @method _draw
     * @private
     */
    _draw: function() {
        switch(this._selectedTool) {
        case 'erase':
            this._lineSetColour('white');
            this._setupDrawLine();
            break;
        case 'draw':
            this._lineSetColour(this._colour);
            this._setupDrawLine();
            break;
        case 'box':
            this._lineSetColour(this._colour);
            this._setupDrawSquare();
            break;
        case 'text':
            this._lineSetColour("black");
            this._setupEnterText();
            break;
        case 'save':
            this._setImage();
            break;
        case 'cancel':
            break;
        }
    },
    
    /**
     * Sets up the square drawing tool.
     *
     * Checks if _strokeColour & _strokeWidth have been selected, if not then exit.
     * Records the click location as this._lastMouse to be used as the starting
     * for the square.
     * Begins drawing the overlay square using an interval
     * Subscribes to the events mouseup and mouseleave with the _drawSquare function
     * to finish the drawing process.
     *
     * @method _setupDrawSquare
     * @private
     */
    _setupDrawSquare: function() {
        if(this._strokeColour === null || this._strokeWidth === null) {
            return;
        }
        var canvasNode = this._form.one('.' + CSS.CANVAS1),
            captureCanvasNode = this._form.one('.' + CSS.CANVAS2),
            intervalDraw,
            underlyingNode = canvasNode._node,
            captureNode = captureCanvasNode._node,
            self = this;
        this._lastMouse = {
                x: this._mouse.x,
                y: this._mouse.y
        };
        intervalDraw = setInterval(function(){self._drawSquareOverlay(captureNode);}, 10);
        
        this._squareMouseUp = captureCanvasNode.on('mouseup', this._drawSquare, this, underlyingNode, captureNode, intervalDraw);
        this._squareMouseLeave = captureCanvasNode.on('mouseleave', this._drawSquare, this, underlyingNode, captureNode, intervalDraw);
    },
    
    /**
     * Draws a square on the passed in canvas.
     *
     * The square is drawn between this._mouse and this._lastMouse
     * with the width and colour set in this._strokeWidth and
     * this._strokeColour.
     *
     * @method _square
     * @param {Node} node
     * @private
     */
    _square: function(node, boxDimensions) {
        var context = node.getContext('2d');
        context.lineWidth = this._strokeWidth;
        context.strokeStyle = this._strokeColour;
        context.strokeRect(boxDimensions.left, boxDimensions.top, boxDimensions.width, boxDimensions.height);
    },
    
    /**
     * Updates the overlay square.
     *
     * Clears the canvas and draws a new square.
     *
     * @method _drawSquareOverlay
     * @param {Node} node
     * @private
     */
    _drawSquareOverlay: function(node) {
        var boxDimensions = {
                top: this._mouse.y < this._lastMouse.y ? this._mouse.y : this._lastMouse.y,
                left: this._mouse.x < this._lastMouse.x ? this._mouse.x : this._lastMouse.x,
                height: Math.abs(this._mouse.y - this._lastMouse.y),
                width: Math.abs(this._mouse.x - this._lastMouse.x)
            };
        this._clearCanvas(node);
        this._square(node, boxDimensions);
    },
    
    /**
     * Draws the square when the user is satisfied with its size.
     *
     * Clears the capture Canvas and draws the same square to the
     * main Canvas underneath it and cleans up the square drawing process.
     *
     * @method _drawSquare
     * @param {Event} evt
     * @param {Node} underlyingNode
     * @param {Node} captureNode
     * @param {interval} intervalDraw
     * @private
     */
    _drawSquare: function(evt, underlyingNode, captureNode, intervalDraw) {
        var boxDimensions = {
                top: this._mouse.y < this._lastMouse.y ? this._mouse.y : this._lastMouse.y,
                left: this._mouse.x < this._lastMouse.x ? this._mouse.x : this._lastMouse.x,
                height: Math.abs(this._mouse.y - this._lastMouse.y),
                width: Math.abs(this._mouse.x - this._lastMouse.x)
            };
        this._squareMouseLeave.detach();
        this._squareMouseUp.detach();
        this._squareMouseLeave = null;
        this._squareMouseUp = null;
        clearInterval(intervalDraw);
        this._clearCanvas(captureNode);
        this._square(underlyingNode, boxDimensions);
    },
    
    /**
     * Clears passed in canvas.
     *
     * @method _clearCanvas
     * @param {Node} node
     * @private
     */
    _clearCanvas: function(node) {
        var context = node.getContext('2d');
        context.clearRect(0,0, node.width, node.height);
    },
    
    /**
     * Handles the the lifecycle of drawing a line.
     *
     * Sets _lastMouse starting point then sets up
     * an interval to call _drawLine every 10 milliseconds.
     * Two event triggers are set to clear the interval
     * if the mouse leaves the canvas area or if the mouse
     * button is released.
     *
     * @method _setupDrawLine
     * @private
     */
    _setupDrawLine:function () {
        if(this._strokeWidth === null || this._strokeColour === null) {
            return;
        }
        var canvasNode = this._form.one('.' + CSS.CANVAS1),
            captureCanvasNode = this._form.one('.' + CSS.CANVAS2),
            intervalDraw,
            underlyingNode = canvasNode._node,
            self = this;
        this._lastMouse = {
                x: this._mouse.x,
                y: this._mouse.y
            };
        intervalDraw = setInterval(function(){self._drawLine(underlyingNode.getContext('2d'));}, 10);

        captureCanvasNode.on('mouseup', function(){clearInterval(this);}, intervalDraw);
        captureCanvasNode.on('mouseleave', function(){clearInterval(this);}, intervalDraw);
    },

    /**
     * Stores the relative mouse position in _mouse.
     *
     * @method _updateMousePosition
     * @param {Event} evt
     * @private
     */
    _updateMousePosition: function (evt) {
        var canvas = this._form.one('.' + CSS.CANVAS2)._node,
            position = this._getMousePosition(evt, canvas);
        this._mouse.x = position.x;
        this._mouse.y = position.y;
    },

    /**
     * Determines the relative position of the mouse
     * to the canvas.
     *
     * @method _getMousePosition
     * @param {Event} evt
     * @param {Canvas} canvas
     * @return {Object}
     * @private
     */
    _getMousePosition: function (evt, canvas) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    },

    /**
     * Draws a line from _lastMouse to _mouse.
     *
     * Draws a line with rounded ends of the width
     * specified by _strokeWidth with the colour
     * _strokeColour.
     * Finally updates _lastMouse to _mouse by copy.
     *
     * @method _drawLine
     * @param {Canvas 2d context} context
     * @private
     */
    _drawLine: function(context) {
        context.beginPath();
        context.moveTo(this._lastMouse.x, this._lastMouse.y);
        context.lineTo(this._mouse.x, this._mouse.y);
        context.lineCap = 'round';
        context.lineWidth = this._strokeWidth;
        context.strokeStyle = this._strokeColour;
        context.stroke();
        this._lastMouse = {
                x: this._mouse.x,
                y: this._mouse.y
            };
    },

    /**
     * Captures the the button click event for changing
     * the colour.
     *
     * @method _eventSetLineColour
     * @param {Event} evt
     * @param {Node} node
     * @private
     */
    _eventSetLineColour: function (evt, node) {
        var currentSelectedColourNode = this._form.one('.'+CSS.SELECTEDCOLOUR),
            colour = node.getStyle('backgroundColor');
        if (currentSelectedColourNode !== null) {
            currentSelectedColourNode.removeClass(CSS.SELECTEDCOLOUR);
        }
        node.ancestor().addClass(CSS.SELECTEDCOLOUR);
        this._setColour(colour);
    },

    /**
     * Sets the colour for the stroke.
     *
     * @method _lineSetColour
     * @param {String} colour
     * @private
     */
    _lineSetColour: function(colour) {
        this._strokeColour = colour;
    },
    
    /**
     * Sets the colour for drawing, text etc.
     *
     * @method _setColour
     * @param {String} colour
     * @private
     */
    _setColour: function(colour) {
        this._colour = colour;
    },

    /**
     * Captures the the button click event for changing
     * the width.
     *
     * @method _eventSetLineWidth
     * @param {Event} evt
     * @param {String} width
     * @private
     */
    _eventSetLineWidth: function (evt, node) {
        var currentSelectedSizeNode = this._form.one('.'+CSS.SELECTEDBRUSHSIZE),
            width = node.getStyle('width');
        if (currentSelectedSizeNode !== null) {
            currentSelectedSizeNode.removeClass(CSS.SELECTEDBRUSHSIZE);
        }
        node.ancestor().addClass(CSS.SELECTEDBRUSHSIZE);
        if (width.indexOf('px') !== -1) {
            width = width.substring(0, width.length-2);
        }
        this._lineSetWidth(width);
    },

    /**
     * Sets the width for the stroke.
     *
     * @method _lineSetWidth
     * @param {String} Wwidth
     * @private
     */
    _lineSetWidth: function(width) {
        this._strokeWidth = width;
    },
    
    _eventSetTool: function(evt, node) {
        var currentSelectedToolNode = this._form.one('.' + CSS.SELECTEDTOOL),
            toolName = node.getData('tool');
        if (currentSelectedToolNode !== null) {
            currentSelectedToolNode.removeClass(CSS.SELECTEDTOOL);
        }
        node.ancestor().addClass(CSS.SELECTEDTOOL);
        this._selectedTool = toolName;
        switch (toolName) {
        case 'erase':
            this._lineSetColour('white');
            break;
        case 'draw':
            break;
        case 'box':
            break;
        case 'text':
            break;
        case 'save':
            this._setImage();
            break;
        case 'cancel':
            break;
        }
    },
    
    _setupEnterText: function() {
        if(this._strokeColour === null || this._strokeWidth === null) {
            return;
        }
        var canvasNode = this._form.one('.' + CSS.CANVAS1),
            captureCanvasNode = this._form.one('.' + CSS.CANVAS2),
            intervalDraw,
            underlyingNode = canvasNode._node,
            captureNode = captureCanvasNode._node,
            self = this;
        this._lastMouse = {
                x: this._mouse.x,
                y: this._mouse.y
        };
        intervalDraw = setInterval(function(){self._drawSquareOverlay(captureNode);}, 10);
        
        this._squareMouseUp = captureCanvasNode.on('mouseup', this._setupTextEditor, this, captureNode, underlyingNode, intervalDraw);
        this._squareMouseLeave = captureCanvasNode.on('mouseleave', this._setupTextEditor, this, captureNode, underlyingNode, intervalDraw);
    },
    
    _setupTextEditor: function(evt, captureNode, underlyingNode, intervalDraw) {
        var template = Y.Handlebars.compile(TEXTEDITORTEMPLATE),
            boxDimensions = {
                top: this._mouse.y < this._lastMouse.y ? this._mouse.y : this._lastMouse.y,
                left: this._mouse.x < this._lastMouse.x ? this._mouse.x : this._lastMouse.x,
                height: Math.abs(this._mouse.y - this._lastMouse.y),
                width: Math.abs(this._mouse.x - this._lastMouse.x)
            },
            editorTemplate = Y.Node.create(template({
                CSS: CSS,
                top: boxDimensions.top+boxDimensions.height+"px",
                left: boxDimensions.left+"px"
            })),
            editor,
            inputBox;
        this._squareMouseLeave.detach();
        this._squareMouseUp.detach();
        this._squareMouseLeave = null;
        this._squareMouseUp = null;
        clearInterval(intervalDraw);
        editor = this._form.one('.'+CSS.LAYERSYSTEM).appendChild(editorTemplate);
        inputBox = editor.one('.'+CSS.TEXTINPUTFIELD);
        inputBox.on('keyup', this._textEditorUpdate, this, inputBox, captureNode, boxDimensions);
        inputBox.on('keypress', this._textEditorEscapeKeys, this, inputBox);
        inputBox.on('blur', this._textEditorCleanup, this, inputBox, captureNode, underlyingNode, boxDimensions);
        inputBox.focus();
    },
    
    _textEditorEscapeKeys: function(evt, inputBox) {
        var key = evt.which;
        if (key === 13) {
            evt.preventDefault();
            inputBox.blur();
            return;
        }
    },
    
    _textEditorUpdate: function(evt, inputBox, captureNode, boxDimensions) {
        this._clearCanvas(captureNode);
        this._writeTextToCanvas(inputBox.get('value'), captureNode, boxDimensions.top, boxDimensions.left, boxDimensions.width);
    },
    
    _textEditorCleanup: function(evt, inputBox, captureNode, underlyingNode, boxDimensions) {
        var text = inputBox.get('value');
        inputBox.ancestor().remove(true);
        this._clearCanvas(captureNode);
        this._writeTextToCanvas(text, underlyingNode, boxDimensions.top, boxDimensions.left, boxDimensions.width);
    },
    
    _writeTextToCanvas: function(text, canvas, top, left, width, textProperties) {
        var textProperties = textProperties||{height: 16, font: "Arial", lineSpacing: 1.1},
            fontStyle = textProperties.height+"px "+textProperties.font,
            textBlock = this._textSplitter(canvas, text, width, textProperties),
            context = canvas.getContext("2d"),
            offset = 0;
        context.font = fontStyle;
        context.textBaseline = "hanging";
        textBlock.forEach(function(line) {
            context.fillText(line, left, top+offset);
            offset += textProperties.height * textProperties.lineSpacing;
        });
    },
    
    _textSplitter: function(canvas, text, width, fontStyle) {
        var words = text.split(" "),
            context = canvas.getContext("2d"),
            sentenceFragments = [''],
            suggestedSentence = '';
        context.font = fontStyle;
        words.forEach(function(word) {
            suggestedSentence = (sentenceFragments[sentenceFragments.length - 1] + ' ' + word).trim();
            if (context.measureText(suggestedSentence).width < width) {
                sentenceFragments[sentenceFragments.length - 1] = suggestedSentence;
            } else {
                sentenceFragments.push(word);
            }
        });
        return sentenceFragments;
    }
});