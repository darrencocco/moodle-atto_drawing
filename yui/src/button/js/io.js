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
 */
var AttoRacsDrawingIoLib = Y.namespace('M.atto_racsdrawing').IoLib = function(){},
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
    IMAGETEMPLATE = '' +
        '<img src="{{url}}" alt="{{alt}}" ' +
            '{{#if width}}width="{{width}}" {{/if}}' +
            '{{#if height}}height="{{height}}" {{/if}}' +
            '{{#if presentation}}role="presentation" {{/if}}' +
            'style="{{alignment}}{{margin}}{{customstyle}}"' +
            '{{#if classlist}}class="{{classlist}}" {{/if}}' +
        '/>';

AttoRacsDrawingIoLib.prototype = {
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
            form.one('.' + this.CSS.INPUTALIGNMENT).set('value', properties.align);
        }
        if (properties.width) {
            form.one('.' + this.CSS.INPUTWIDTH).set('value', properties.width);
        }
        if (properties.height) {
            form.one('.' + this.CSS.INPUTHEIGHT).set('value', properties.height);
        }
        if (properties.alt) {
            form.one('.' + this.CSS.INPUTALT).set('value', properties.alt);
        }
        if (properties.src) {
            //This should theoritically load the already existing image into the drawing panel.
            theImage = new Image();
            theImage.src = properties.src;
            form.one('.' + this.CSS.CANVAS1).setAttribute('height', theImage.height);
            form.one('.' + this.CSS.CANVAS1).setAttribute('width', theImage.width);
            form.one('.' + this.CSS.CANVAS2).setAttribute('height', theImage.height);
            form.one('.' + this.CSS.CANVAS2).setAttribute('width', theImage.width);
            form.one('.' + this.CSS.CANVAS1)._node.getContext('2d').drawImage(theImage, 0, 0);
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
            url = form.one('.' + this.CSS.CANVAS1)._node.toDataURL(),
            alt = form.one('.' + this.CSS.INPUTALT).get('value'),
            width = form.one('.' + this.CSS.INPUTWIDTH).get('value'),
            height = form.one('.' + this.CSS.INPUTHEIGHT).get('value'),
            alignment = form.one('.' + this.CSS.INPUTALIGNMENT).get('value'),
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
    }
};