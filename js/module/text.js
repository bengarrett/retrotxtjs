import {
  CharacterSet,
  DOS437Ctrls,
  DOS437En,
  ISO88591,
  Win1252EN,
} from "./charset.js";

export { DOS437En, ISO88591, Win1252EN };

/**
 * Convert Unicode encoded strings to emulate a legacy code page.
 */
export class LegacyText {
  /**
   * Creates an instance of LegacyText.
   * @param [text=``] Text to parse
   * @param [codepage=`cp_1252`] Character table key
   * @param [displayControls=false] Display DOS control characters
   * (used by unit tests)
   */
  constructor(text = ``, options = { codepage: ``, displayControls: null }) {
    if (typeof text !== `string`)
      throw new Error(`text parameter must be text, not ${typeof text}`);
    if (!(`codepage` in options)) options.codepage = ``;
    if (!(`displayControls` in options)) options.displayControls = null;
    this.text = text;
    this.codepage = options.codepage;
    this.errorCharacter = `�`;
    // this Boolean needs to be a string type
    this.displayControls = `${options.displayControls}` || `false`;
    this.asciiTable = [];
    this.extendedTable = [];
  }
  /**
   * Transcode text derived from a character set into Unicode characters that
   * emulate the IBM PC era CP-437 set.
   * @returns {string} Unicode text
   */
  normalize() {
    this._characterTable();
    let normalized = ``;
    // loop through text and use the values to propagate the container
    for (let i = 0; i < this.text.length; i++) {
      normalized += this._fromCharCode(this.text.charCodeAt(i));
    }
    return normalized;
  }
  /**
   * Build a character table.
   * @returns {(Array|void)} Characters
   */
  _characterTable() {
    // ascii C0 controls are either ignored or are common between all tables
    this.asciiTable = new CharacterSet(DOS437Ctrls).get();
    // extended character tables
    const table = new CharacterSet(`${this.codepage}`);
    this.extendedTable = table.get();
  }
  /**
   * Looks up a character code and returns an equivalent Unicode symbol.
   * @param {*} number Hex or decimal character code
   * @returns {string} Unicode symbol
   */
  _fromCharCode(number) {
    const NUL = 0,
      horizontalTab = 9,
      lineFeed = 10,
      carriageReturn = 13,
      escape = 27,
      US = 31,
      invalid = 65533;
    // handle oddball `NUL` characters that some docs use as a placeholder.
    // 65533 is used by the browser as an invalid or unknown character code.
    // the ␀ glyph used to be return but doesn't work well in monospace fonts
    if (number === NUL) return ` `;
    if (number === invalid) return ` `;
    // ASCII was originally 7-bits so could support a maximum of 128 characters.
    // interpret ASCII C0 controls as CP-437 symbols characters 0-31
    if (number >= NUL && number <= US) {
      // 0x1B is the escape character that is also used as a trigger for
      // ANSI escape codes
      if (number === escape) return this.asciiTable[number];
      // `displayControls` enabled will force the display of most CP-437 glyphs
      if (this.displayControls === `true`) {
        switch (number) {
          // return as an ASCII C0 control
          case horizontalTab:
            return `\t`;
          case lineFeed:
          case carriageReturn:
            return `\n`;
          default:
            // JavaScript also supports these escape codes, but in HTML they
            // have no effect
            // 08 BS \b - backspace
            // 11 VT \v - vertical tab
            // 12 FF \f - form feed
            // return all other ASCII C0 controls as CP437 glyphs
            if (this.codepage === DOS437En) return this.asciiTable[number];
            return ` `;
        }
      }
      // RetroTxt option displayControls=disabled will return all C0 controls
      // return as an ASCII C0 control
      if (this.codepage === DOS437En) return `${String.fromCharCode(number)}`;
      switch (number) {
        // return as an ASCII C0 control
        case horizontalTab:
          return `\t`;
        case lineFeed:
        case carriageReturn:
          return `\n`;
      }
      return ` `;
    }
    const space = 32,
      tilde = 126,
      deleted = 127;
    // characters 0x20 (32) through to 0x7E (126) are universal between
    // most code pages and so they are left as-is
    if (number >= space && number <= tilde)
      return `${String.fromCharCode(number)}`;
    // normally ASCII 0x7F (127) is the delete control
    // but in CP437 it can also represent a house character
    if (number === deleted && `${this.displayControls}` === `true`) return `⌂`;
    // ASCII extended are additional supported characters when ASCII is used in
    // an 8-bit set. All MS-DOS code pages are 8-bit and support the additional
    // 128 characters, between 8_0 (128)...F_F (255)
    switch (this.codepage) {
      case DOS437En:
        return this._lookupCp437(number);
      case ISO88591:
      case Win1252EN:
        return this._lookupCharCode(number);
      default:
        throw new Error(`Unknown code page: "${this.codepage}"`);
    }
  }

  /**
   * A lookup for extended characters using Code Page 437 as the base table.
   * @param {*} number Hex or decimal character code
   * @returns {string} Unicode symbol
   */
  _lookupCp437(number) {
    const nbsp = 0xa0,
      ÿ = 0xff,
      offset = 128;
    if (number >= nbsp && number <= ÿ)
      return this.extendedTable[number - offset];
    // check for unique Windows 1252 characters
    const win1252 = this._lookupRows8_9(number);
    if (win1252 !== ``) return win1252;
    // assume any values higher than 0xFF (255) are Unicode values
    return ``;
  }

  /**
   * A lookup for extended characters using Windows 1252 in rows eight and nine.
   * @param {*} number Hex or decimal character code
   * @returns {string} Unicode symbol
   */
  _lookupRows8_9(number) {
    const chrs = [
      `€`,
      ``,
      `‚`,
      `ƒ`,
      `„`,
      `…`,
      `†`,
      `‡`,
      `ˆ`,
      `‰`,
      `Š`,
      `‹`,
      `Œ`,
      ``,
      `Ž`,
      ``,
      ``,
      `‘`,
      `’`,
      `“`,
      `”`,
      `•`,
      `–`,
      `—`,
      `\u02dc`,
      `™`,
      `š`,
      `›`,
      `œ`,
      ``,
      `ž`,
      `Ÿ`,
    ];
    const i = chrs.indexOf(String.fromCodePoint(number));
    if (i === -1) return `${this.extendedTable[number - 128]}`;
    return `${this.extendedTable[i]}`;
  }

  /**
   * A lookup for extended characters.
   * @param {*} number Hex or decimal character code
   * @returns {string} Unicode symbol
   */
  _lookupCharCode(number) {
    const euro = 0x80,
      ÿ = 0xff;
    if (number >= euro && number <= ÿ) return this.extendedTable[number];
    // assume any values higher than 0xFF (255) are Unicode values
    return ``;
  }
}
