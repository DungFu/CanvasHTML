/**
 * Button with a fill color and a hover color with text inside that can be clicked.
 * @param {CanvasRenderingContext2D}  context The 2d rendering context to draw on
 * @param {number}   x         The left x position of the button
 * @param {number}   y         The top y position of the button
 * @param {Function} cb        The callback to call when the button is clicked.
 * @param {Object}   [options] The options object that is optional to change the defaults.
 */
function Button(context, x, y, text, cb, options) {
    this._options = extend({
        width: 160,
        height: 30,
        backgroundColor: "rgb(200,200,200)",
        hoverBackgroundColor: "rgb(255,200,200)",
        fontSize: 20,
        fontColor: "rgb(0,0,0)"
    }, options);
    this.context = context;
    this.cb = cb;
    this.x = x;
    this.y = y;
    this.text = text;
    this.bbox = new BoundingBox(this.x, this.y, this.x+this._options.width, this.y+this._options.height);
    this.hover = false;
}

/**
 * Dehovers the button.
 */
Button.prototype.dehover = function() {
    this.hover = false;
};

/**
 * Receives a click location and calls callback if within the bounding box of the button.
 * @param   {number} x The x pixel location of mouse click.
 * @param   {number} y The y pixel location of mouse click.
 */
Button.prototype.receiveClick = function(x, y) {
    if (this.bbox.pointIntersects(x, y)) {
        this.cb();
    }
};

/**
 * Receives a mouseover location and toggles to hover if within the bounding box of the button.
 * @param   {number} x The x pixel location of mouseover.
 * @param   {number} y The y pixel location of mouseover.
 */
Button.prototype.receiveMouseOver = function(x, y) {
    if (this.bbox.pointIntersects(x, y)) {
        this.hover = true;
    }
};

/**
 * Renders the button and the text inside of the button and updates the bounding box.
 */
Button.prototype.render = function() {
    this.bbox.set(this.x, this.y, this.x+this._options.width, this.y+this._options.height);
    var backgroundColor = this._options.backgroundColor;
    if (this.hover) {
        backgroundColor = this._options.hoverBackgroundColor;
    }
    DrawRect(
        this.context,
        this.x,
        this.y,
        this._options.width,
        this._options.height,
        true,
        1,
        backgroundColor
    );
    DrawText(
        this.context,
        this.x+this._options.width/2,
        this.y+this._options.height/2,
        this._options.fontColor,
        this.text,
        this._options.fontSize,
        this._options.font,
        false,
        'center',
        'middle'
    );
};
