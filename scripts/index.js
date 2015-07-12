(function (View, WeatherProvider, Config, FontProfile) {
    System.Gadget.settingsUI = "settings.html";

    var provider = WeatherProvider.Yahoo;
    var background = document.getElementById('background');

    var config;
    var updateTimeout;

    var update = function () {
        provider.query(config.location, config.unitSystem, {
            success: querySuccessHandler,
            error: queryErrorHandler
        });
    };

    var querySuccessHandler = function (data) {
        renderWeather(data);
        scheduleUpdate();
    };

    var queryErrorHandler = function (error) {
        renderStatus(error);
        scheduleUpdate();
    };

    var renderWeather = function (data) {
        var weatherView = new View.Weather(data, {
            font: FontProfile[config.fontProfileName],
            size: config.size,
            color: config.color,
            shadow: config.shadow,
            displayWind: config.displayWind,
            displayHumidity: config.displayHumidity
        });

        weatherView.renderTo(background);
        resize();
    };

    var renderStatus = function (status) {
        var statusView = new View.Status(status, {
            font: FontProfile[config.fontProfileName],
            size: config.size,
            color: config.color,
            shadow: config.shadow
        });

        statusView.renderTo(background);
        resize();
    };

    var resize = function () {
        document.body.style.width = background.style.width;
        document.body.style.height = background.style.height;
    };

    var scheduleUpdate = function () {
        updateTimeout = setTimeout(update, config.updateInterval * 1000);
    };

    var reload = function () {
        config = Config.get();
        clearTimeout(updateTimeout);
        renderStatus('Loading...');
        update();
    };

    reload();

    Config.set({
        attribution: provider.attribution
    });

    System.Gadget.onSettingsClosed = function (event) {
        if (event.closeAction === event.Action.commit) {
            reload();
        }
    };
})(window.View, window.WeatherProvider, window.Config, window.FontProfile);
