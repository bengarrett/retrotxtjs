# RetrotxtJS

RetrotxtJS correctly displays legacy ASCII and NFO text on a modern UTF-8 HTML page.

## What does it do?

- Rerenders text encoded in legacy ISO-8859-1 <small>latin1</small>, CP-437 <small>US-ASCII</small>, or Windows-1252 but incorrectly display on UTF-8 <small>Unicode</small> webpages.
- It applies historically accurate, monospaced fonts to the text.
- Optionally wraps preformatted text that lacks line breaks.

## Install

```bash
yarn add retrotxt
# or
npm install retrotxt
```

## Usage

To use RetrotxtJS,

- Copy the content of `dist/` to the webroot of your site.
- The element containing the plain, [preformatted text](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre) will require a `retrotxtCanvas` id attribute.
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
    <script defer src="/js/retrotxt-init.js">
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
  <script defer src="/js/retrotxt-init.js">
</html>
```

RetrotxtJS uses ES6 modules, [so it requires a webserver](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts).

## Examples

There is a collection of example HTML files with different preformatted text that you can view in the browser.

```bash
yarn run serve
# or
npm run serve

# Starting up http-server, serving dist
# Available on:
#  http://127.0.0.1:8087
```

## Technical

#### Browser support

RetrotxtJS requires a modern browser that supports [ES6 modules]() and the [element.append()]() method. Before loading any heavy assets such as the fonts or primary scripts, the initialization script tests the browser using legacy JS. It will gracefully exit if the browser is not suitable.

#### Web server requirement

RetrotxtJS uses ES6 modules that cannot be run locally in a browser due to their security requirements, such as using the `file:///` protocol. Otherwise, the browser will throw CORS errors and abort the scripts.

#### RetrotxtJS location

RetrotxtJS expects all assets to maintain the same relative directory structure found in `dist/`.
However, you may place these directories (`css/`, `font/`, `js/`) in any subdirectory you wish. So instead of putting these directories in the webserver root, you could store them in the subdirectory `lib/retrotxt/` and update the script element as so:

```html
<script defer src="/lib/retrotxt/js/retrotxt-init.js">
```

#### Character encoding limitations

The CP-437 and Windows-1252 character tables support are incomplete due to a limitation of Unicode.
The HTML standard never supported CP-437 and abandoned Windows-1252 support after HTML v4.

Unicode (and thus UTF-8) is backwardly compatible with [ASCII (Basic Latin)](https://unicode.org/charts/PDF/U0000.pdf), [ISO-8859-1 (Latin-1 Supplement)](https://unicode.org/charts/PDF/U0080.pdf) but not with CP-437 or Windows-1252.

A few code points that CP-437 and Windows-1252 use are left empty by the Unicode standard, meaning they will not display on a UTF-8 encoded web page or document.

- `0080` in use by the Ç character in CP-437 and the € symbol in Windows-1252.
- `0081` in use the ü character in CP-437.
- `0099` in use the Ö character in CP-437 and the ™ symbol in Windows-1252.

## License

### GNU LESSER GENERAL PUBLIC LICENSE

RetrotxtJS uses a [GNU Lesser General Public License v3.0](https://choosealicense.com/licenses/lgpl-3.0).

**This license does not cover the included fonts.**.

The Ultimate Oldschool PC Font Pack v2.2 uses an [Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/) license ([tldr](https://int10h.org/oldschool-pc-fonts/readme/#legal_stuff)).

Multi-Platform Fonts uses a [GNU General Public License Font Exception (GPL+FE)]() license ([tldr](https://en.wikipedia.org/wiki/GPL_font_exception)).

## Credits

RetrotxtJS by [Ben Garrett](https://devtidbits.com/ben-garrett), [📧](mailto:code.by.ben@gmail.com).

- `IBM_VGA_8x16` font [by Viler](https://int10h.org/oldschool-pc-fonts).
- `TopazPlus_a1200` font [by TrueSchool Ascii](https://github.com/rewtnull/amigafonts).

## Appendix

### Character encodings

#### CP-437

IBM created it for their 1981 IBM-PC to allow English-speaking developers to develop text-based programs with keyboard interfaces. Today it is still used by digital artists who create text and colored ANSI art, but otherwise, it is unsupported.

#### ISO-8895-1

It was introduced in 1987 as an official international standard, adopted by Unix, Linux, the Commodore Amiga, and much of the world-wide-web in its early years.

#### Windows-1252

Microsoft's take on ISO-8895-1, whereby they broke it by inserting several new characters with Windows 3.1 and 95 that could only be viewed on computers running Windows. Windows-1252 did become a valid HTML page encoding, but its usage was “problematic”.

#### Unicode

Legacy character encodings were mostly 8-bit with a fixed set of 256 or fewer characters. A computer could only display the characters and symbols included in the chosen code page. If an author wrote on a machine set to CP-437 and wanted to show the $ dollar, € euro, and ₽ ruble symbols in the same document, they couldn't work due to the missing glyphs in the code page.

Unicode overcomes these limitations by assigning each known glyph, symbol, or character a unique numeric identifier, known as a codepoint, that wouldn't conflict with any other.

#### UTF-8

It is an 8-bit implementation of Unicode that is now the default encoding for most operating systems, HTML, and this document.
