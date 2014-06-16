/**
 * Manages all the items (textBoxs, checkBoxs, and buttons).
 * @param {Object} characterDict Character dictionary.
 * @param {Object} modifierDict  Modifier dictionary.
 */
function ItemManager(characterDict, modifierDict) {
    this.items = [];
    this.characterDict = characterDict;
    this.modifierDict = modifierDict;
    this.modifierKeysStates = {};
}

/**
 * Triggers on key down event.
 * @param {KeyEvent} e Key event for the key down.
 */
ItemManager.prototype.OnKeyDown = function(e) {
    var i;
    if (this.characterDict[e.keyCode]) {
        for (i = 0; i < this.items.length; i++) {
            var c = this.characterDict[e.keyCode][0];
            if (this.modifierKeysStates['Shift']) {
                c = this.characterDict[e.keyCode][1];
            }
            if (typeof(this.items[i].receiveCharacter) == 'function') {
                this.items[i].receiveCharacter(c);
            }
        }
    } else if (this.modifierDict[e.keyCode]) {
        this.modifierKeysStates[this.modifierDict[e.keyCode]] = true;
    } else if (e.keyCode == 37) {
        //left
        for (i = 0; i < this.items.length; i++) {
            if (typeof(this.items[i].receiveCursorMove) == 'function') {
                this.items[i].receiveCursorMove('left');
            }
        }
    } else if (e.keyCode == 39) {
        //right
        for (i = 0; i < this.items.length; i++) {
            if (typeof(this.items[i].receiveCursorMove) == 'function') {
                this.items[i].receiveCursorMove('right');
            }
        }
    } else if (e.keyCode == 8) {
        // backspace
        for (i = 0; i < this.items.length; i++) {
            if (typeof(this.items[i].deleteCharacter) == 'function') {
                this.items[i].deleteCharacter();
            }
        }
    }
};

/**
 * Triggers on key up event.
 * @param {KeyEvent} e Key event for the key up.
 */
ItemManager.prototype.OnKeyUp = function(e) {
    if (this.modifierDict[e.keyCode]) {
        this.modifierKeysStates[this.modifierDict[e.keyCode]] = false;
    }
};

/**
 * Triggers on mouse down event.
 * @param {MouseEvent} e Key event for the mouse down.
 */
ItemManager.prototype.OnMouseDown = function(e){
    var obj = MouseEvent(e);
    var x = obj.x;
    var y = obj.y;
    var i;
    for (i = 0; i < this.items.length; i++) {
        if (typeof(this.items[i].deselect) == 'function') {
            this.items[i].deselect();
        }
    }
    for (i = 0; i < this.items.length; i++) {
        if (typeof(this.items[i].receiveClick) == 'function') {
            this.items[i].receiveClick(x, y);
        }
    }
};

/**
 * Triggers on mouse up event.
 * @param {MouseEvent} e Key event for the mouse up.
 */
ItemManager.prototype.OnMouseUp = function(e) {

};

/**
 * Triggers on mouse move event.
 * @param {MouseEvent} e Key event for the mouse move.
 */
ItemManager.prototype.OnMouseMove = function(e) {
    var obj = MouseEvent(e);
    var x = obj.x;
    var y = obj.y;
    var i;
    for (i = 0; i < this.items.length; i++) {
        if (typeof(this.items[i].dehover) == 'function') {
            this.items[i].dehover();
        }
    }
    for (i = 0; i < this.items.length; i++) {
        if (typeof(this.items[i].receiveMouseOver) == 'function') {
            this.items[i].receiveMouseOver(x, y);
        }
    }
};

/**
 * Adds an item to the manager.
 * @param {TextBox|CheckBox|Button} i Item to add to the manager.
 */
ItemManager.prototype.addItem = function(i) {
    if (this.items.indexOf(i) == -1) {
        this.items.push(i);
    }
};

/**
 * Removes an item from the manager.
 * @param {TextBox|CheckBox|Button} i Item to remove from the manager.
 */
ItemManager.prototype.removeItem = function(i) {
    while (this.items.indexOf(i) != -1) {
        var index = this.items.indexOf(i);
        this.items.splice(index, 1);
    }
};

/**
 * Wipes all items from the item manager
 */
ItemManager.prototype.wipe = function() {
    this.items = [];
};

/**
 * Renders every item in the manager if it has a render method.
 */
ItemManager.prototype.render = function() {
    for (var i = 0; i < this.items.length; i++) {
        if (typeof(this.items[i].render) == 'function') {
            this.items[i].render();
        }
    }
};