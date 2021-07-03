# RetrotxtJS

RetrotxtJS correctly displays legacy ASCII and NFO text on a modern UTF-8 HTML page.

## What does it do?

- On UTF-8 <small>Unicode</small> webpages, it rerenders preformatted text encoded in legacy ISO-8859-1 <small>latin1</small>, CP-437 <small>US-ASCII</small>, or Windows-1252 that incorrectly display.
- It applies historically accurate, monospaced fonts to the text.
- Optionally wraps preformatted text that lacks line breaks.

#### CP-437 preformatted text when viewed on a UTF-8 page

![Retrotxt text logo in a pre element](screens/readme-0.png)

#### CP-437 text viewed with RetrotxtJS

![Retrotxt text logo with RetrotxtJS](screens/readme-1.png)

## Install

```bash
yarn add retrotxt
# or
npm install retrotxt
```

## Usage

To use RetrotxtJS,

- Copy the `css/`, `font/`, `js/` directories within `dist/` to the webroot of your site.
- The element containing the [preformatted text](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre) will require a `retrotxtCanvas` id attribute.
- Insert the RetrotxtJS initialization script at the end of the page.

#### Example page

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Example</title>
  </head>
  <body>
    <pre>
        Hello
        world.
    </pre>
  </body>
</html>
```

#### Apply the ID attribute

```html
<pre id="retrotxtCanvas">
    Hello
    world.
</pre>
```

#### Insert the initialization script

```html
    <script defer src="/js/retrotxt-init.js"></script>
  </body>
</html>
```

#### All done!

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Example</title>
  </head>
  <body>
    <pre id="retrotxtCanvas">
        Hello
        world.
    </pre>
  </body>
  <script defer src="/js/retrotxt-init.js"></script>
</html>
```

RetrotxtJS uses ES6 modules, [so it requires a webserver](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts).

![Hello world example with RetrotxtJS](screens/readme-2.png)

## Examples

There is a collection of example HTML files with several preformatted texts that you can view in the browser.

```bash
yarn run serve
# or
npm run-script serve

# Starting up http-server, serving dist
# Available on:
#  http://127.0.0.1:8087
```

## Defaults

The default <em>View text as:</em> button used by RetrotxtJS is Unicode.
You may wish to change this on a per-page basis by assigning a class value to the `retrotxtCanvas` element.

#### Unicode

```html
<pre id="retrotxtCanvas"></pre>
```

#### MS-DOS

```html
<pre id="retrotxtCanvas" class="retrotxt-msdos"></pre>
```

#### Amiga

```html
<pre id="retrotxtCanvas" class="retrotxt-amiga"></pre>
```

#### Windows

```html
<pre id="retrotxtCanvas" class="retrotxt-windows"></pre>
```

## Technical

#### RetrotxtJS location

RetrotxtJS expects all assets to maintain the same relative directory structure found in `dist/`.
However, you may place these directories (`css/`, `font/`, `js/`) in any subdirectory you wish. So instead of putting these directories in the webserver root, you could store them in the subdirectory `lib/retrotxt/` and update the script element as so:

```html
<script defer src="/lib/retrotxt/js/retrotxt-init.js">
```

#### Browser support

RetrotxtJS requires a modern browser that supports [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and the [Element.append()](https://developer.mozilla.org/en-US/docs/Web/API/Element/append) method. Before loading any heavy assets such as the fonts or primary scripts, the initialization script feature tests the browser using legacy JS. It will gracefully exit if the browser is not suitable.

#### Web server requirement

RetrotxtJS uses ES6 modules that cannot be run locally in a browser due to their security requirements. Otherwise, the browser will throw CORS errors and abort the scripts.

#### Character and encoding limitations

RetrotxtJS assumes your webserver loads any CP-437 preformatted text as Windows-1252. That may not be the case on some configurations, and RetrotxtJS may not work correctly.

Unicode (and thus UTF-8) is backwardly compatible with [ASCII (Basic Latin)](https://unicode.org/charts/PDF/U0000.pdf), [ISO-8859-1 (Latin-1 Supplement)](https://unicode.org/charts/PDF/U0080.pdf) but not with CP-437.

A few code points that CP-437 uses for display characters are control characters in most other situations.

- `0009` in use by the ○ character is in use as a `\t` horizontal tab control.
- `000A` in use by the ◙ character is in use as a `\n` newline line feed.
- `000D` in use by the ♪ character is in use as a `\r` newline carriage return.

* `001B` in use by the ← character is displayed in RetrotxtJS and the escape control used by ANSI text.
* `001A` in use by the → character is sometimes an MS-DOS [End-of-file marker](https://en.wikipedia.org/wiki/End-of-file).

## License

### GNU LESSER GENERAL PUBLIC LICENSE

RetrotxtJS uses a [GNU Lesser General Public License v3.0](https://choosealicense.com/licenses/lgpl-3.0).

**This license does not cover the included fonts.**

The Ultimate Oldschool PC Font Pack v2.2 uses an [Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/) license ([tldr](https://int10h.org/oldschool-pc-fonts/readme/#legal_stuff)).

Multi-Platform Fonts uses a [GNU General Public License Font Exception (GPL+FE)]() license ([tldr](https://en.wikipedia.org/wiki/GPL_font_exception)).

## Credits

RetrotxtJS by [Ben Garrett](https://devtidbits.com/ben-garrett) &nbsp; [📧](mailto:code.by.ben@gmail.com).

- `IBM_VGA_8x16` font [by Viler](https://int10h.org/oldschool-pc-fonts).
- `TopazPlus_a1200` font [by TrueSchool Ascii](https://github.com/rewtnull/amigafonts).

## Appendix

### Character encodings

#### CP-437

IBM created it for their 1981 IBM-PC to allow English-speaking developers to develop text-based programs with keyboard interfaces. Today it is still used by digital artists who [create text and colored ANSI art](https://16colo.rs/), but otherwise, it is unsupported.

#### ISO-8895-1

It was introduced in 1987 as an official international standard, adopted by Unix, Linux, the Commodore Amiga, and much of the world-wide-web in its early years.

#### Windows-1252

Microsoft's take on ISO-8895-1, whereby they broke it by inserting several new characters with Windows 3.1 and 95 that could only be viewed on computers running Windows. Windows-1252 did become a valid HTML page encoding, but its "usage" was “problematic”.

#### Unicode

Legacy character encodings were mostly 8-bit with a fixed set of 256 or fewer characters. A computer could only display the characters and symbols included in the chosen code page. If an author wrote on a machine set to CP-437 and wanted to show the $ dollar, € euro, and ₽ ruble symbols in the same document, they couldn't due to the lack of available glyphs.

Unicode overcomes these limitations by assigning each known glyph, symbol, or character a unique, non-conflicting numeric identifier, known as a codepoint, that is always accessible.

#### UTF-8

It is an 8-bit implementation of Unicode that is now the default encoding for most operating systems, HTML, and this document.
