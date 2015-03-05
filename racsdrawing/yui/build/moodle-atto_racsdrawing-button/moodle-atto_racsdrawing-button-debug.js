YUI.add('moodle-atto_racsdrawing-button', function (Y, NAME) {

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
        CANVAS: 'atto_racsdrawing_canvas',
        DONE: 'atto_racsdrawing_done',
        INPUTALT: 'atto_racsdrawing_inputalt',
        INPUTWIDTH: 'atto_racsdrawing_inputwidth',
        INPUTHEIGHT: 'atto_racsdrawing_inputheight',
        INPUTALIGNMENT: 'atto_racsdrawing_inputalignment'
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
                '<form class="atto_form">' +
                    '<input class="{{CSS.DRAWLINE}} yui3-button" type="image" src="{{image_url "pencil" component}}" alt="{{get_string "draw_line" component}}" title="{{get_string "draw_line" component}}"></input>' +
                    '<input class="{{CSS.ERASER}} yui3-button" type="image" src="{{image_url "eraser" component}}" alt="{{get_string "eraser" component}}" title="{{get_string "eraser" component}}"></input>' +
                    '<canvas class="{{CSS.CANVAS}}" width="800" height="600"></canvas>' +
                    '<button class="{{CSS.DONE}}" type="button">{{get_string "save_complete" component}}</button>' +
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
                '/>';


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
     * The current colour the drawing tool is set too
     *
     * @param _colour
     * @type String
     * @private
     */
    _colour: null,

    /**
     * The size of the stroke to draw with
     *
     * @param _size
     * @type Unknown
     * @private
     */
    _size: null,

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
            width: '900px',
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
            })),
            self = this;

        this._form = content;

        // Configure the view of the current image.
        this._applyImageProperties(this._form);

        this._form.one('.' + CSS.DRAWLINE).on('click', this._drawLineEnabled, this, '#000000');
        this._form.one('.' + CSS.ERASER).on('click', this._drawLineEnabled, this, '#FFFFFF');
        this._form.one('.' + CSS.DONE).on('click', this._setImage, this);
        this._form.one('.' + CSS.CANVAS).on('mousedown', this._draw, self);
        this._form.one('.' + CSS.CANVAS).on('mousemove', this._updateMousePosition, self);

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
            form.one('.' + CSS.CANVAS).setAttribute('height', theImage.height);
            form.one('.' + CSS.CANVAS).setAttribute('width', theImage.width);
            form.one('.' + CSS.CANVAS)._node.getContext('2d').drawImage(theImage, 0, 0);
        }

        // Update the image preview based on the form properties.
        //this._autoAdjustSize();
    },

    /**
     * Update the image in the contenteditable.
     *
     * @method _setImage
     * @param {EventFacade} e
     * @private
     */
    _setImage: function(e) {
        var form = this._form,
            url = form.one('.' + CSS.CANVAS)._node.toDataURL(),
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

        e.preventDefault();

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

    _draw: function() {
        var canvasNode = this._form.one('.' + CSS.CANVAS),
            intervalDraw,
            underlyingNode = canvasNode._node,
            self = this;
        this._lastMouse = {
                    x: this._mouse.x,
                    y: this._mouse.y
                };
        intervalDraw = setInterval(function(){self._drawLine(underlyingNode.getContext('2d'));}, 10);

        canvasNode.on('mouseup', function(){clearInterval(this);}, intervalDraw);
        canvasNode.on('mouseleave', function(){clearInterval(this);}, intervalDraw);
    },
    _updateMousePosition: function (evt) {
        var canvas = this._form.one('.' + CSS.CANVAS)._node,
            position = this._getMousePosition(evt, canvas);
        this._mouse.x = position.x;
        this._mouse.y = position.y;
    },
    _getMousePosition: function (evt, canvas) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    },
    _drawLine: function(context) {
        context.beginPath();
        context.moveTo(this._lastMouse.x, this._lastMouse.y);
        context.lineTo(this._mouse.x, this._mouse.y);
        context.stroke();
        this._lastMouse = {
                x: this._mouse.x,
                y: this._mouse.y
            };
    }
});

}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
