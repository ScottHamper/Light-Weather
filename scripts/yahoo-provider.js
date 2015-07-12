(function (WeatherProvider) {
    var endpoint = 'https://query.yahooapis.com/v1/public/yql?format=xml';

    var hasResults = function (xml) {
        return xml.getElementsByTagName('channel').length > 0;
    };

    var attribute = function (name, element) {
        return element.attributes.getNamedItem(name).nodeValue;
    };

    var parseXml = function (xml) {
        var units = xml.getElementsByTagName('yweather:units')[0];
        var condition = xml.getElementsByTagName('yweather:condition')[0];
        var wind = xml.getElementsByTagName('yweather:wind')[0];
        var atmosphere = xml.getElementsByTagName('yweather:atmosphere')[0];

        return {
            temperature: attribute('temp', condition),
            description: attribute('text', condition),
            wind: {
              speed: attribute('speed', wind),
              unit: attribute('speed', units)
            },
            humidity: attribute('humidity', atmosphere)
        };
    };

    var query = function (location, unitSystem, callbacks) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function (event) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var xml = request.responseXML;
                    var data;

                    if (!hasResults(xml)) {
                        callbacks.error('No results for location');
                        return;
                    }

                    try {
                        data = parseXml(xml);
                    } catch (e) {
                        callbacks.error('Error parsing data');
                        return;
                    }

                    callbacks.success(data);
                    return;
                }

                callbacks.error('Weather unavailable');
            }
        };

        var unit = unitSystem.toLowerCase() === 'metric' ? 'c' : 'f';

        var yql = 'select units.speed, item.condition.temp, item.condition.text, wind.speed, atmosphere.humidity from weather.forecast where woeid in (select woeid from geo.places(1) where text=\'' + location + '\') and u=\'' + unit + '\'';

        var url = endpoint + '&q=' + encodeURIComponent(yql);
        request.open('GET', url, true);
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        request.send();
    };

    WeatherProvider.Yahoo = {
        query: query,
        attribution: {
            name: 'Yahoo',
            logo: 'https://poweredby.yahoo.com/purple.png',
            url: 'https://www.yahoo.com/?ilc=401'
        }
    };
})(window.WeatherProvider = window.WeatherProvider || {});
