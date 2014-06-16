/**
 * Small bounding box object to manage intersections.
 * @param {number} minx Min x.
 * @param {number} miny Min y.
 * @param {number} maxx Max x.
 * @param {number} maxy Max y.
 */
function BoundingBox(minx, miny, maxx, maxy) {
    this.minx = (minx !== undefined) ? minx: -Infinity;
    this.miny = (miny !== undefined) ? miny: -Infinity;
    this.maxx = (maxx !== undefined) ? maxx: Infinity;
    this.maxy = (maxy !== undefined) ? maxy: Infinity;
}

/**
 * Sets the values for the bounding box.
 * @param {number} minx Min x.
 * @param {number} miny Min y.
 * @param {number} maxx Max x.
 * @param {number} maxy Max y.
 */
BoundingBox.prototype.set = function(minx, miny, maxx, maxy) {
    this.minx = minx;
    this.miny = miny;
    this.maxx = maxx;
    this.maxy = maxy;
};

/**
 * Checks to see if the point is inside of the bounding box.
 * @param   {number} x X point to check.
 * @param   {number} y Y point to check.
 * @returns {boolean}  Whether it inside the bounding box or not.
 */
BoundingBox.prototype.pointIntersects = function(x, y) {
    if (x < this.maxx && x > this.minx && y < this.maxy && y > this.miny) {
        return true;
    } else {
        return false;
    }
};

/**
 * Checks to see if the boundingbox intersects the bounding box.
 * @param   {BoundingBox} bbox Bounding Box to check.
 * @returns {boolean}  Whether it intersects the bounding box or not.
 */
BoundingBox.prototype.boxIntersects = function(bbox) {
    if (bbox.maxx < this.minx || bbox.minx > this.maxx || bbox.maxy < this.miny || bbox.miny > this.maxy) {
        return false;
    } else {
        return true;
    }
};