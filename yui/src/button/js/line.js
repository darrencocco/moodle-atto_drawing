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
var AttoRacsDrawingLineLib = Y.namespace('M.atto_racsdrawing').LineLib = function(){};

AttoRacsDrawingLineLib.prototype = {
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
    _setupDrawLine:function (canvasNode, captureCanvasNode) {
        if(this._strokeWidth === null || this._strokeColour === null) {
            return;
        }
        var intervalDraw,
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
    }
};