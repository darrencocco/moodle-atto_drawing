var AttoRacsDrawingTextLib = Y.namespace('M.atto_racsdrawing').TextLib = function(){},
    TEXTEDITORTEMPLATE = '' +
        '<div class="{{CSS.TEXTINPUTCONTAINER}}" style="top:{{top}};left:{{left}};">' +
            '<input type="text" class="{{CSS.TEXTINPUTFIELD}}">' +
        '</div>';
//This file is part of Moodle - http://moodle.org/
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
AttoRacsDrawingTextLib.prototype = {
    _setupEnterText: function(canvasNode, captureCanvasNode) {
        if(this._strokeColour === null || this._strokeWidth === null) {
            return;
        }
        var intervalDraw,
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
                CSS: this.CSS,
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
        editor = Y.one(captureNode).ancestor().appendChild(editorTemplate);
        inputBox = editor.one('.'+this.CSS.TEXTINPUTFIELD);
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
            textBlock = null,
            context = canvas.getContext("2d"),
            offset = 0;
        context.font = fontStyle;
        context.textBaseline = "hanging";
        textBlock = this._textSplitter(canvas, text, width, textProperties);
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
};