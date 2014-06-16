/**
 * Text with a font color and a hover color that can be clicked.
 * @param {CanvasRenderingContext2D}  context The 2d rendering context to draw on
 * @param {number}   x         The left x position of the text
 * @param {number}   y         The top y position of the text
 * @param {Function} cb        The callback to call when the text is clicked.
 * @param {Object}   [options] The options object that is optional to change the defaults.
 */
function Text(context, x, y, text, cb, options) {
    this._options = extend({
        fontSize: 20,
        fontColor: "rgb(0,0,0)",
        hoverFontColor: "rgb(100,0,0)",
        font: "Arial",
        bold: false,
        textAlign: 'left'
    }, options);
    this.context = context;
    this.cb = cb;
    this.x = x;
    this.y = y;
    this.text = text;
    this.bbox = new BoundingBox(this.x, this.y, this.x+this._options.fontSize, this.y+this._options.fontSize);
    this.hover = false;
}

/**
 * Sets the text.
 * @param {string} text The text to set.
 */
Text.prototype.setText = function(text) {
    this.text = text;
};

/**
 * Dehovers the text box.
 */
Text.prototype.dehover = function() {
    this.hover = false;
};

/**
 * Receives a click location and calls callback if within the bounding box of the text.
 * @param   {number} x The x pixel location of mouse click.
 * @param   {number} y The y pixel location of mouse click.
 */
Text.prototype.receiveClick = function(x, y) {
    if (this.bbox.pointIntersects(x, y)) {
        this.cb();
    }
};

/**
 * Receives a mouseover location and toggles to hover if within the bounding box of the text.
 * @param   {number} x The x pixel location of mouseover.
 * @param   {number} y The y pixel location of mouseover.
 */
Text.prototype.receiveMouseOver = function(x, y) {
    if (this.bbox.pointIntersects(x, y)) {
        this.hover = true;
    }
};

/**
 * Renders the text and updates the bounding box.
 */
Text.prototype.render = function() {
    var textWidth = WidthDrawText(
        this.context,
        fontColor,
        this.text,
        this._options.fontSize,
        this._options.font,
        this._options.bold,
        this._options.textAlign,
        'top'
    );
    if (this._options.textAlign == 'center') {
        this.bbox.set(this.x-textWidth/2, this.y, this.x+textWidth/2, this.y+this._options.fontSize);
    } else {
        this.bbox.set(this.x, this.y, this.x+textWidth, this.y+this._options.fontSize);
    }
    var fontColor = this._options.fontColor;
    if (this.hover) {
        fontColor = this._options.hoverFontColor;
    }
    DrawText(
        this.context,
        this.x,
        this.y,
        fontColor,
        this.text,
        this._options.fontSize,
        this._options.font,
        this._options.bold,
        this._options.textAlign,
        'top'
    );
};
