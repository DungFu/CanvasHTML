/**
 * A TextBox has an outline with text inside of it and can be clicked to gain focus. Typing
 * characters with focus will insert characters at the cursor location. Cursor location can be moved
 * using the arrow keys (left and right).
 * @param {CanvasRenderingContext2D}  context The 2d rendering context to draw on
 * @param {number}   x         The left x position of the textbox
 * @param {number}   y         The top y position of the textbox
 * @param {Function} cb        The callback to call when changes occur on the textbox.
 * @param {Object}   [options] The options object that is optional to change the defaults.
 */
function TextBox(context, x, y, cb, options) {
    this._options = extend({
        width: 160,
        height: 30,
        fontSize: 20,
        font: "Arial",
        fontColor: "rgb(0,0,130)",
        outlineColor: "rgb(0,0,0)",
        hoverOutlineColor: "rgb(255,0,0)",
        outlineLineWidth: 1,
        cursorBlinkRate: 500
    }, options);
    this.context = context;
    this.cb = cb;
    this.x = x;
    this.y = y;
    this.text = "";
    this.bbox = new BoundingBox(this.x, this.y, this.x+this._options.width, this.y+this._options.height);
    this.selected = false;
    this.cursorLocation = 0;
    this.cursorVisible = true;
    this.hover = false;

    setInterval(function() {
        if (this.selected) {
            this.cursorVisible = !this.cursorVisible;
        }
    }.bind(this), this._options.cursorBlinkRate);
}

/**
 * Deselects the text box
 */
TextBox.prototype.deselect = function() {
    this.selected = false;
};

/**
 * Dehovers the text box.
 */
TextBox.prototype.dehover = function() {
    this.hover = false;
};

/**
 * Receives a click location and toggles to selected if within the bounding box of the text box.
 * @param   {number} x The x pixel location of mouse click.
 * @param   {number} y The y pixel location of mouse click.
 */
TextBox.prototype.receiveClick = function(x, y) {
    if (this.bbox.pointIntersects(x, y)) {
        this.selected = true;
    }
};

/**
 * Receives a mouseover location and toggles to hover if within the bounding box of the text box.
 * @param   {number} x The x pixel location of mouseover.
 * @param   {number} y The y pixel location of mouseover.
 */
TextBox.prototype.receiveMouseOver = function(x, y) {
    if (this.bbox.pointIntersects(x, y)) {
        this.hover = true;
    }
};

/**
 * Receives a cursor move direction.
 * @param   {string} direction Direction to move the cursor (left, right)
 */
TextBox.prototype.receiveCursorMove = function(direction) {
    if (this.selected) {
        if (direction == 'left') {
            if (this.cursorLocation <= 0) {
                this.cursorLocation = 0;
            } else {
                this.cursorLocation--;
            }
        } else if (direction == 'right') {
            if (this.cursorLocation >= this.text.length) {
                this.cursorLocation = this.text.length;
            } else {
                this.cursorLocation++;
            }
        }
    }
};

/**
 * Deletes the previous character before the current cursor position.
 */
TextBox.prototype.deleteCharacter = function() {
    if (this.selected) {
        if (this.cursorLocation > 0) {
            this.text = this.text.substring(0, this.cursorLocation-1) +
                        this.text.substring(this.cursorLocation, this.text.length);
            this.cursorLocation--;
            this.cb(this.text);
        }
    }
};

/**
 * Inserts a character at the current cursor position.
 * @param   {string} character Character to insert.
 */
TextBox.prototype.receiveCharacter = function(character) {
    if (this.selected) {
        if (this.cursorLocation > 0) {
            this.text = this.text.substring(0, this.cursorLocation) +
                        character +
                        this.text.substring(this.cursorLocation, this.text.length);
        } else {
            this.text = character + this.text;
        }
        this.cursorLocation++;
        this.cb(this.text);
    }
};

/**
 * Renders the entire textbox and shrinks the visible text so that it doesn't go outside of the
 * area of the textbox and updates the bounding box.
 */
TextBox.prototype.render = function() {
    this.bbox.set(this.x, this.y, this.x+this._options.width, this.y+this._options.height);
    var bufferSize = (this._options.height-this._options.fontSize)/2;
    var text = this.text;
    if (this.selected) {
        var extraChar = "|";
        if (!this.cursorVisible) {
            extraChar = " ";
        }
        text = this.text.substring(0, this.cursorLocation) + extraChar +
               this.text.substring(this.cursorLocation, this.text.length);
    }
    var outlineColor = this._options.outlineColor;
    if (this.hover) {
        outlineColor = this._options.hoverOutlineColor;
    }
    var tempCursorLocation = this.cursorLocation;
    while (WidthDrawText(
        this.context,
        this._options.fontColor,
        text,
        this._options.fontSize,
        this._options.font,
        false,
        'left',
        'middle'
    ) > this._options.width - bufferSize*2) {
        if (text.length - tempCursorLocation < tempCursorLocation) {
            text = text.substr(1, text.length);
            tempCursorLocation--;
        } else {
            text = text.substr(0, text.length-1);
        }
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
    DrawText(
        this.context,
        this.x+(this._options.height-this._options.fontSize)/2,
        this.y+this._options.height/2,
        this._options.fontColor,
        text,
        this._options.fontSize,
        this._options.font,
        false,
        'left',
        'middle'
    );
};