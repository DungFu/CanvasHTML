/**
 * Checkbox with outline and X in the middle that marked checked status.
 * @param {CanvasRenderingContext2D}  context The 2d rendering context to draw on
 * @param {number}   x         The left x position of the checkbox
 * @param {number}   y         The top y position of the checkbox
 * @param {Function} cb        The callback to call when changes occur on the checkbox.
 * @param {Object}   [options] The options object that is optional to change the defaults.
 */
function CheckBox(context, x, y, cb, options) {
    this._options = extend({
        width: 20,
        height: 20,
        outlineColor: "rgb(0,0,0)",
        hoverOutlineColor: "rgb(255,0,0)",
        checkColor: "rgb(0,0,0)",
        checkLineWidth: 2,
        outlineLineWidth: 1,
        bufferPercent: 0.2
    }, options);
    this.context = context;
    this.cb = cb;
    this.x = x;
    this.y = y;
    this.checked = false;
    this.bbox = new BoundingBox(this.x, this.y, this.x+this._options.width, this.y+this._options.height);
    this.hover = false;
}

/**
 * Dehovers the text box.
 */
CheckBox.prototype.dehover = function() {
    this.hover = false;
};

/**
 * Receives a click location and toggles checked status if within the bounding box of the check box.
 * @param   {number} x The x pixel location of mouse click.
 * @param   {number} y The y pixel location of mouse click.
 */
CheckBox.prototype.receiveClick = function(x, y) {
    if (this.bbox.pointIntersects(x, y)) {
        this.checked = !this.checked;
        this.cb(this.checked);
    }
};

/**
 * Receives a mouseover location and toggles to hover if within the bounding box of the check box.
 * @param   {number} x The x pixel location of mouseover.
 * @param   {number} y The y pixel location of mouseover.
 */
CheckBox.prototype.receiveMouseOver = function(x, y) {
    if (this.bbox.pointIntersects(x, y)) {
        this.hover = true;
    }
};

/**
 * Renders the check box and the check "x" if it is checked and updates the bounding box.
 */
CheckBox.prototype.render = function() {
    this.bbox.set(this.x, this.y, this.x+this._options.width, this.y+this._options.height);
    var outlineColor = this._options.outlineColor;
    if (this.hover) {
        outlineColor = this._options.hoverOutlineColor;
    }
    DrawRect(
        this.context,
        this.x,
        this.y,
        this._options.width,
        this._options.height,
        false,
        this._options.outlineLineWidth,
        outlineColor
    );
    if (this.checked) {
        DrawLine(
            this.context,
            this.x+this._options.width*this._options.bufferPercent,
            this.y+this._options.height*this._options.bufferPercent,
            this.x+this._options.width*(1.0-this._options.bufferPercent),
            this.y+this._options.height*(1.0-this._options.bufferPercent),
            this._options.checkLineWidth,
            this._options.checkColor
        );
        DrawLine(
            this.context,
            this.x+this._options.width*this._options.bufferPercent,
            this.y+this._options.height*(1.0-this._options.bufferPercent),
            this.x+this._options.width*(1.0-this._options.bufferPercent),
            this.y+this._options.height*this._options.bufferPercent,
            this._options.checkLineWidth,
            this._options.checkColor
        );
    }
};
