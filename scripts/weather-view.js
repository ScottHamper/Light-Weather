(function (TextObject, View) {
    // Ratio of margin around entire view to base font size
    var MARGIN_Y_RATIO = .3;
    var MARGIN_X_RATIO = .25;

    View.Weather = function (data, config) {
        this._data = data;
        this._font = config.font;
        this._size = config.size;
        this._color = config.color;
        this._shadow = config.shadow;
        this._displayWind = config.displayWind;
        this._displayHumidity = config.displayHumidity;
    };

    View.Weather.prototype = {
        renderTo: function (background) {
            background.removeObjects();

            var temperature = this._renderTemperatureTo(background);
            var left = temperature.right();
            var bottom = temperature.bottom();

            var degreeSymbol = this._renderDegreeSymbolTo(background, left);
            left = degreeSymbol.right();

            var description = this._renderDescriptionTo(background, left);
            var top = description.bottom();
            var right = description.right();

            if (this._displayWind) {
                var wind = this._renderWindTo(background, left, top);
                top = wind.bottom();
                right = Math.max(right, wind.right());
                bottom = Math.max(bottom, wind.bottom());
            }

            if (this._displayHumidity) {
                var humidity = this._renderHumidityTo(background, left, top);
                right = Math.max(right, humidity.right());
                bottom = Math.max(bottom, humidity.bottom());
            }

            background.style.width = right + this._margin().x;
            background.style.height = bottom + this._margin().y;
        },

        _renderTemperatureTo: function (background) {
            return new TextObject(
                this._data.temperature,
                background,
                {
                    font: this._font,
                    size: this._size,
                    color: this._color,
                    shadow: this._shadow,
                    left: this._margin().x,
                    top: this._margin().y
                }
            );
        },

        _renderDegreeSymbolTo: function (background, left) {
            return new TextObject('°', background, {
                font: this._font,
                size: this._size * this._font.degreeSizeRatio,
                color: this._color,
                shadow: this._shadow,
                left: left,
                top: this._margin().y,
                margin: {
                    right: this._margin().x
                }
            });
        },

        _renderDescriptionTo: function (background, left) {
            return new TextObject(
                this._data.description.toUpperCase(),
                background,
                {
                    font: this._font,
                    size: this._size * this._font.mediumSizeRatio,
                    color: this._color,
                    shadow: this._shadow,
                    left: left,
                    top: this._margin().y
                }
            );
        },

        _renderWindTo: function (background, left, top) {
            var size = this._size * this._font.smallSizeRatio;
            var wind = this._data.wind.speed
                + ' ' + this._data.wind.unit
                + ' Wind';

            return new TextObject(
                wind.toUpperCase(),
                background,
                {
                    font: this._font,
                    size: size,
                    color: this._color,
                    shadow: this._shadow,
                    left: left,
                    top: top,
                    margin: {
                        // Woooo, magic numbers! I seriously don't even know
                        // what I would name this.
                        // SMALL_TEXT_TOP_MARGIN_MULTIPLIER_THING.
                        // Nailed it.
                        top: size * this._font.lineHeightRatio * .5
                    }
                }
            );
        },

        _renderHumidityTo: function (background, left, top) {
            var size = this._size * this._font.smallSizeRatio;
            var humidity = this._data.humidity + '% Humidity';

            return new TextObject(
                humidity.toUpperCase(),
                background,
                {
                    font: this._font,
                    size: size,
                    color: this._color,
                    shadow: this._shadow,
                    left: left,
                    top: top,
                    margin: {
                        top: size * this._font.lineHeightRatio * .5
                    }
                }
            );
        },

        _margin: function () {
            return {
                x: this._size * MARGIN_X_RATIO,
                y: this._size * MARGIN_Y_RATIO
            };
        }
    };
})(window.TextObject, window.View = window.View || {});
