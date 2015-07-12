// Attempt at an immutable wrapper around g:text. Why immutable? 'CAUSE.
//
// Unfortunately, to be immutable we have to render the text object on
// construction in order for all state to be available (e.g., width).
// The original text object API does not allow for creating an object
// without also rendering it immediately to a background.
//
// Also, it's normally difficult to position texts of different sizes
// relative to one another because they are given intrinsic vertical
// padding from line-height as a ratio of their font size. Using the
// info in FontProfile, we can strip away this extra padding to make
// positioning easier.
//
// Similarly, we also strip away extra padding provided by the font's
// word spacing, which always gets applied to the horizontal edges.
(function () {
    var TextObject = function (value, background, style) {
        style.margin = style.margin || {};

        this._value = value;
        this._font = style.font;
        this._size = style.size;
        this._color = style.color;
        this._shadow = style.shadow;
        this._left = style.left || 0;
        this._top = style.top || 0;
        this._margin = {
            left: style.margin.left || 0,
            top: style.margin.top || 0,
            right: style.margin.right || 0,
            bottom: style.margin.bottom || 0
        };

        this._textObject = background.addTextObject(
            this._value,
            this._font.name,
            this._size,
            this._color,
            this._internalLeft(),
            this._internalTop()
        );

        if (this._shadow) {
            this._textObject.addShadow(this._shadow, 1, 50, 1, 1);
        }
    };

    TextObject.prototype = {
        value: function () {
            return this._value;
        },

        font: function () {
            return this._font;
        },

        size: function () {
            return this._size;
        },

        color: function () {
            return this._color;
        },

        shadow: function () {
            return this._shadow;
        },

        width: function () {
            return this._textObject.width
                + this.margin().left
                + this.margin().right
                - this._wordSpace() * 2;
        },

        height: function () {
            return this._textObject.height
                + this.margin().top
                + this.margin().bottom
                - (this._lineHeight() - this.size());
        },

        left: function () {
            return this._left;
        },

        top: function () {
            return this._top;
        },

        right: function () {
            return this.left() + this.width();
        },

        bottom: function () {
            return this.top() + this.height();
        },

        margin: function () {
            return this._margin;
        },

        _internalLeft: function () {
            return this.left()
                + this.margin().left
                - this._wordSpace();
        },

        _internalTop: function () {
            return this.top()
                + this.margin().top
                - (this._lineHeight() - this.size()) * .5
        },

        _lineHeight: function () {
            return this.size() * this.font().lineHeightRatio;
        },

        _wordSpace: function () {
            return this.size() * this.font().wordSpaceRatio;
        }
    };

    window.TextObject = TextObject;
})();
