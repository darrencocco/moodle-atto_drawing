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
var AttoRacsDrawingSharedLib = Y.namespace('M.atto_racsdrawing').SharedLib = function(){};

AttoRacsDrawingSharedLib.prototype = {
    CSS: {
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
     * Clears passed in canvas.
     *
     * @method _clearCanvas
     * @param {Node} node
     * @private
     */
    _clearCanvas: function(node) {
        var context = node.getContext('2d');
        context.clearRect(0,0, node.width, node.height);
    }
};