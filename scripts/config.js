(function (JSON) {
    var SETTINGS_KEY = 'config';

    var defaults = {
        // Possible values are any of the keys in FontProfile (font-profile.js)
        fontProfileName: 'SegoeUI',

        // Size of temperature text. All others are relative to this
        size: 120,

        // Either a Windows color name:
        // https://msdn.microsoft.com/en-us/library/aa358802%28v=vs.85%29.aspx
        //
        // Or in the format 'Color(A, R, G, B)' with values ranging
        // from 0 to 255. However, alpha is ignored.
        color: 'white',

        // Same deal as `color`, but can also be '' or `undefined` for none
        shadow: 'black',

        // Number of seconds between each weather API request
        updateInterval: 60,

        // Location string used in weather API query
        location: 'Columbus, OH',

        // Whether or not wind speed is displayed
        displayWind: true,

        // Whether or not humidity is displayed
        displayHumidity: true,

        // Either 'imperial' or 'metric'
        unitSystem: 'imperial'
    };

    var Config = {
        get: function () {
            // Really don't feel like dealing with `read` vs `readString`
            // and `write` vs `writeString`, so we're just gonna serialize
            // and deserialize all our config settings to/from JSON.
            var json = System.Gadget.Settings.readString(SETTINGS_KEY);
            var config = json ? JSON.parse(json) : {};
            return extend(defaults, config);
        },

        set: function (config) {
            var json = JSON.stringify(extend(Config.get(), config));
            System.Gadget.Settings.writeString(SETTINGS_KEY, json);
        }
    };

    var extend = function () {
        var extended = {};

        for (var i = 0; i < arguments.length; i++) {
            var object = arguments[i];

            for (var key in object) {
                if (!object.hasOwnProperty(key)) {
                    continue;
                }

                extended[key] = object[key];
            }
        }

        return extended;
    };

    window.Config = Config;
})(window.JSON);
