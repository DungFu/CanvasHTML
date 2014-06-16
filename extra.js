/**
 * Extra functions for drawing, object extension, and mouse event parsing.
 */

function MouseEvent(e) {
    var x, y;
    // Get the mouse position relative to the canvas element.
    if (e.layerX || e.layerX == 0) { // Firefox
        x = e.layerX;
        y = e.layerY;
    } else if (e.offsetX || e.offsetX == 0) { // Opera
        x = e.offsetX;
        y = e.offsetY;
    }
    return {x: x, y: y};
}

function extend(to, from) {
    if (from) {
        var keys = Object.keys(from);
        for (var i = 0; i < keys.length; i++) {
            to[keys[i]] = from[keys[i]];
        }
    }
    return to;
}

function DrawRect(context, x, y, width, height, filled, lineWidth, color) {
    if (filled) {
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
    } else {
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.strokeRect(x, y, width, height);
    }
}

function ClearRect(context, x, y, width, height) {
    context.clearRect(x, y, width, height);
}

function WidthDrawText(context, color, text, size, font, bold, textAlign, textBaseline) {
    var boldText = "";
    if (bold) {
        boldText = "bold";
    }
    context.font = boldText + (size.toString() + "px "+font);
    context.fillStyle = color;
    context.textAlign = textAlign;
    context.textBaseline = textBaseline;
    return context.measureText(text).width;
}

function DrawText(context, x, y, color, text, size, font, bold, textAlign, textBaseline) {
    var boldText = "";
    if (bold) {
        boldText = "bold";
    }
    context.font = boldText + (size.toString() + "px "+font);
    context.fillStyle = color;
    context.textAlign = textAlign;
    context.textBaseline = textBaseline;
    context.fillText(text, x, y);
}

function DrawLine(context, x1, y1, x2, y2, lineWidth, color) {
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}