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
var AttoRacsDrawingSquareLib = Y.namespace('M.atto_racsdrawing').SquareLib = function(){};

AttoRacsDrawingSquareLib.prototype = {
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
    _setupDrawSquare: function(canvasNode, captureCanvasNode) {
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

        this._squareMouseUp = captureCanvasNode.on('mouseup', this._drawSquare, this, underlyingNode, captureNode, intervalDraw);
        this._squareMouseLeave = captureCanvasNode.on('mouseleave', this._drawSquare, this, underlyingNode, captureNode, intervalDraw);
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
    }
};