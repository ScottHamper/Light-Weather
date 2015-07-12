(function (Config) {
    var config = Config.get();

    var location = document.getElementById('location');
    var windToggle = document.getElementById('wind-toggle');
    var humidityToggle = document.getElementById('humidity-toggle');
    var imperial = document.getElementById('imperial');
    var metric = document.getElementById('metric');
    var font = document.getElementById('font');
    var size = document.getElementById('size');

    var attribution = document.getElementById('attribution');
    var attributionAnchor = document.createElement('a');
    var attributionLogo = document.createElement('img');

    var commitSettings = function () {
        Config.set({
            location: location.value,
            displayWind: windToggle.checked,
            displayHumidity: humidityToggle.checked,
            unitSystem: imperial.checked ? 'imperial' : 'metric',
            fontProfileName: font.value,
            size: Number(size.value) || config.fontSize
        });
    };

    location.value = config.location;
    windToggle.checked = config.displayWind;
    humidityToggle.checked = config.displayHumidity;
    imperial.checked = config.unitSystem.toLowerCase() === 'imperial';
    metric.checked = config.unitSystem.toLowerCase() === 'metric';
    font.value = config.fontProfileName;
    size.value = config.size;

    attributionAnchor.href = config.attribution.url;
    attributionLogo.src = config.attribution.logo;
    attributionLogo.alt = 'Powered by ' + config.attribution.name;

    attributionAnchor.appendChild(attributionLogo);
    attribution.appendChild(attributionAnchor);

    document.body.style.height = document.body.scrollHeight;

    System.Gadget.onSettingsClosing = function (event) {
        if (event.closeAction == event.Action.commit) {
            commitSettings();
        }
        event.cancel = false;
    };
})(window.Config);
