# Dolus

Dolus is a Firefox Addon to hide your real IP from websites by sending X-Forwarded-For headers with fake IP addresses.

The X-Forwarded-For request header is used by proxies to tell web servers what IP address they are forwarding for.

Because of this, some websites (like Ruby On Rails powered sites) will log the IP seen in the X-Forwarded-For header instead of the actual IP that made the request, even though the value in the header can be completely controlled by the client.

The extension can give you some potential extra anonymity by putting out a smoke screen of false information, but it **IS NOT a replacement for a real proxy, VPN or anonymity software like Tor!**

## Addon Preferences

 - `BOOL extensions.dolus@jetpack.showStartupNotification`: Show startup notification with IP address for current session.
 - `STRING extensions.dolus@jetpack.permanentForwardedForAddress`: Specify a permanent IP address to use instead of randomly generating one.

## License

The MIT License (MIT)

Copyright © 2013 Michael Henriksen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
