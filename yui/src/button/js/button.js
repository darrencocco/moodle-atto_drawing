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
                    '<img class="{{CSS.TOOL}} {{CSS.DRAWLINE}}" ' +
                    'data-tool="draw" ' +
                    'src="{{image_url "pencil" component}}" ' +
                    'title="{{get_string "pencil" component}}"/>'+
                '</div>' +
                '</td><td>' +
                '<div class="{{CSS.ICON}}">' +
                    '<img class="{{CSS.TOOL}} {{CSS.ERASER}}" ' +
                    'data-tool="erase" ' +
                    'src="{{image_url "eraser" component}}" ' +
                    'title="{{get_string "eraser" component}}"/>' +
                '</div>' +
                '</td</tr>' +
                '<tr><td>' +
                '<div class="{{CSS.ICON}}">' +
                    '<img class="{{CSS.TOOL}} {{CSS.TEXT}}" ' +
                    'data-tool="text" ' +
                    'src="{{image_url "entertext" component}}" ' +
                    'title="{{get_string "enter_text" component}}"/>' +
                '</div>' +
                '</td><td>' +
                '<div class="{{CSS.ICON}}">' +
                    '<img class="{{CSS.TOOL}} {{CSS.BOX}}" '+
                    'data-tool="box" ' +
                    'src="{{image_url "drawbox" component}}" ' +
                    'title="{{get_string "draw_box" component}}"/>' +
                '</div>' +
                '</td</tr>' +
                '<tr><td>' +
                '<div class="{{CSS.ICON}}">' +
                    '<img class="{{CSS.TOOL}} {{CSS.SAVE}}" ' +
                    'data-tool="save" ' +
                    'src="{{image_url "save" component}}" ' +
                    'title="{{get_string "save" component}}"/>' +
                '</div>' +
                '</td><td>' +
                '<div class="{{CSS.ICON}}">' +
                    '<img class="{{CSS.TOOL}} {{CSS.CANCEL}}" ' +
                    'data-tool="cancel" ' +
                    'src="{{image_url "cancel" component}}" ' +
                    'title="{{get_string "cancel" component}}"/>' +
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
    '</form>';

Y.namespace('M.atto_racsdrawing').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin,
        [Y.M.atto_racsdrawing.SharedLib,
         Y.M.atto_racsdrawing.SquareLib,
         Y.M.atto_racsdrawing.TextLib,
         Y.M.atto_racsdrawing.LineLib,
         Y.M.atto_racsdrawing.IoLib], {
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
                CSS: this.CSS,
                component: COMPONENTNAME
            }));

        this._form = content;

        // Configure the view of the current image.
        this._applyImageProperties(this._form);

        this._strokeWidth = null;
        this._strokeColour = null;

        this._form.all('.' + this.CSS.TOOL).each(function(node) {
            node.ancestor().on('click', this._eventSetTool, this, node);
        }, this);
        this._form.all('.' + this.CSS.BRUSH).each(function(node) {
            node.ancestor().on('click', this._eventSetLineWidth, this, node);
        }, this);
        this._form.all('.' + this.CSS.COLOUR).each(function(node) {
            node.ancestor().on('click', this._eventSetLineColour, this, node);
        }, this);

        //Starts drawing process
        this._form.one('.' + this.CSS.CANVAS2).on('mousedown', this._draw, this);
        //Keeps track of mouse position. Should I attach detach this instead so it only tracks when necessary.
        this._form.one('.' + this.CSS.CANVAS2).on('mousemove', this._updateMousePosition, this);

        return content;
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
            this._setupDrawLine(this._form.one('.' + this.CSS.CANVAS1), this._form.one('.' + this.CSS.CANVAS2));
            break;
        case 'draw':
            this._lineSetColour(this._colour);
            this._setupDrawLine(this._form.one('.' + this.CSS.CANVAS1), this._form.one('.' + this.CSS.CANVAS2));
            break;
        case 'box':
            this._lineSetColour(this._colour);
            this._setupDrawSquare(this._form.one('.' + this.CSS.CANVAS1), this._form.one('.' + this.CSS.CANVAS2));
            break;
        case 'text':
            this._lineSetColour("black");
            this._setupEnterText(this._form.one('.' + this.CSS.CANVAS1), this._form.one('.' + this.CSS.CANVAS2));
            break;
        case 'save':
            this._setImage();
            break;
        case 'cancel':
            break;
        }
    },

    /**
     * Stores the relative mouse position in _mouse.
     *
     * @method _updateMousePosition
     * @param {Event} evt
     * @private
     */
    _updateMousePosition: function (evt) {
        var canvas = this._form.one('.' + this.CSS.CANVAS2)._node,
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
     * Captures the the button click event for changing
     * the colour.
     *
     * @method _eventSetLineColour
     * @param {Event} evt
     * @param {Node} node
     * @private
     */
    _eventSetLineColour: function (evt, node) {
        var currentSelectedColourNode = this._form.one('.'+this.CSS.SELECTEDCOLOUR),
            colour = node.getStyle('backgroundColor');
        if (currentSelectedColourNode !== null) {
            currentSelectedColourNode.removeClass(this.CSS.SELECTEDCOLOUR);
        }
        node.ancestor().addClass(this.CSS.SELECTEDCOLOUR);
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
        var currentSelectedSizeNode = this._form.one('.'+this.CSS.SELECTEDBRUSHSIZE),
            width = node.getStyle('width');
        if (currentSelectedSizeNode !== null) {
            currentSelectedSizeNode.removeClass(this.CSS.SELECTEDBRUSHSIZE);
        }
        node.ancestor().addClass(this.CSS.SELECTEDBRUSHSIZE);
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
        var currentSelectedToolNode = this._form.one('.' + this.CSS.SELECTEDTOOL),
            toolName = node.getData('tool');
        if (currentSelectedToolNode !== null) {
            currentSelectedToolNode.removeClass(this.CSS.SELECTEDTOOL);
        }
        node.ancestor().addClass(this.CSS.SELECTEDTOOL);
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
    }
});