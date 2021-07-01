# RetrotxtJS

RetrotxtJS turns legacy ASCII and NFO text into in-browser HTML.

## Install and usage

```bash
yarn add retrotxt
```

After installation you can add RetrotxtJS to an existing page with a.

Add a unique ``id to the`<pre>` element you wish to apply.

Append a `<script>` element to the end of the page's `<html>` element.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My test page</title>
  </head>
  <body>
    <pre>
 ·                 ·
 │ This is my page │
 ·                 ·
    </pre>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My test page</title>
  </head>
  <body>
    <pre id="retrotxtCanvas">
 ·                 ·
 │ This is my page │
 ·                 ·
    </pre>
  </body>
  <script defer src="">
</html>
```

## Examples

## Build

```bash
# Clone this repo.
git clone https://github.com/bengarrett/retrotxtjs
cd retrotxtjs

# Install dependencies.
yarn # or npm install

# Build the RetrotxtJS package.
grunt

# The built files are found in.
cd build
```

## License

### GNU LESSER GENERAL PUBLIC LICENSE

RetrotxtJS uses a [GNU Lesser General Public License v3.0](https://choosealicense.com/licenses/lgpl-3.0).

**The included fonts are not covered by this license**.

The Ultimate Oldschool PC Font Pack v2.2 uses a [Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/) license ([tldr](https://int10h.org/oldschool-pc-fonts/readme/#legal_stuff)).

Multi Platform Fonts uses a [GNU General Public License Font Exception (GPL+FE)]() license ([tldr](https://en.wikipedia.org/wiki/GPL_font_exception)).

## Credits

RetrotxtJS by [Ben Garrett](https://devtidbits.com/ben-garrett), [📧](mailto:code.by.ben@gmail.com).

- `IBM_VGA_8x16` font [by Viler](https://int10h.org/oldschool-pc-fonts).
- `TopazPlus_a1200` font [by TrueSchool Ascii](https://github.com/rewtnull/amigafonts).
