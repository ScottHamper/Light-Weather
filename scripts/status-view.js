(function (TextObject, View) {
    // Ratio of margin around entire view to base font size
    var MARGIN_Y_RATIO = .3;
    var MARGIN_X_RATIO = .25;

    View.Status = function (status, config) {
        this._status = status;
        this._font = config.font;
        this._size = config.size;
        this._color = config.color;
        this._shadow = config.shadow;
    };

    View.Status.prototype = {
        renderTo: function (background) {
            background.removeObjects();

            var status = new TextObject(
                this._status.toUpperCase(),
                background,
                {
                    font: this._font,
                    size: this._size * this._font.smallSizeRatio,
                    color: this._color,
                    shadow: this._shadow,
                    left: this._margin().x,
                    top: this._margin().y
                }
            );

            background.style.width = status.right() + this._margin().x;
            background.style.height = status.bottom() + this._margin().y;
        },

        _margin: function () {
            return {
                x: this._size * MARGIN_X_RATIO,
                y: this._size * MARGIN_Y_RATIO
            };
        }
    };
})(window.TextObject, window.View = window.View || {});
