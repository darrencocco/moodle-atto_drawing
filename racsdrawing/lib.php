<?php
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
 * Atto text editor integration version file.
 *
 * @package    atto_racsdrawing
 * @copyright  2015 Darren Cocco - Royal Australasian College of Surgeons  <darren.cocco@surgeons.org>
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Initialise the strings required for js
 */
function atto_racsdrawing_strings_for_js() {
    global $PAGE;

    $strings = array(
        'draw_line',
        'eraser',
        'save_complete',
        'pluginname',
        'dialogtitle',
    );

    $PAGE->requires->strings_for_js($strings, 'atto_racsdrawing');
}

