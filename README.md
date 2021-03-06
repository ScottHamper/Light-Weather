# Light Weather
Light Weather is a minimalist weather desktop gadget for Windows 7.

## Screenshots
![Light Weather on the desktop](/../screenshots/screenshots/light-weather.png?raw=true)

![Light Weather settings](/../screenshots/screenshots/light-weather-settings.png?raw=true)

## Installation
### From Packaged Release
1. [Download the latest release](https://github.com/ScottHamper/Light-Weather/releases/download/1.0.0/lightweather.gadget)
2. Double click and install it

### From Source
1. [Download a copy of the repo](https://github.com/ScottHamper/Light-Weather/archive/master.zip)
2. Zip up the source files, making sure that they're in the root of the archive
3. Rename the zip to "lightweather.gadget", changing the file type
4. Double click and install it

## Configuration
Most basic settings are configurable through the gadgets settings panel UI. However, there are a few other default settings that can be configured by editing `/scripts/config.js`, such as text/shadow color and how often the gadget queries for new weather data.

After installing the gadget, the source files should be located at:  
`%USERPROFILE%\AppData\Local\Microsoft\Windows Sidebar\Gadgets\lightweather.gadget`

Simply modify the config.js defaults, close any open instances of the gadget, and load a new instance.

## Word of Warning
Microsoft has officially [discontinued Windows gadgets](http://windows.microsoft.com/en-us/windows/gadgets) due to security concerns. Running malicious gadgets will certainly cause you trouble (like all malicious software), but an issue remains even for well-intentioned gadgets: [man-in-the-middle](https://www.owasp.org/index.php/Man-in-the-middle_attack) and [code injection](https://www.owasp.org/index.php/Code_Injection) attacks.

Just like in any web environment, connecting to remote services insecurely (without TLS) opens up the possibility of a man-in-the-middle being able to inject code. However, the problem is exacerbated with Windows gadgets due to the fact that JavaScript running inside of a gadget is not sandboxed the same way as in a browser. This can potentially be exploited to allow an attacker to execute arbitrary code on your computer (you get pwned).

With that being said, it is still possible to create safe desktop gadgets. Light Weather gets its data from [Yahoo's public XML API](https://developer.yahoo.com/weather/) over HTTPS. By using HTTPS, the risk of being man-in-the-middled is mitigated. By consuming an XML API, Light Weather avoids executing any JavaScript returned from a remote source, thus mitigating the risk of a code-injection attack.

Ideally, you should still take a moment to audit the code and verify that it is safe to use. If you discover any security related issues, please let me know by [creating an issue on GitHub](https://github.com/ScottHamper/Light-Weather/issues)!