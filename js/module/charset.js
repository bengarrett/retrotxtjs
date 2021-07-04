/**
 * RetroTxtJS
 * js/module/charset.js
 * © Ben Garrett, code.by.ben@gmail.com
 */
// IBM PC/MS-DOS control codes
export const DOS437Ctrls = `cp437_C0`;
// IBM PC/MS-DOS English legacy text
export const DOS437En = `cp_437`;
// Commodore Amiga and Unix English legacy text
export const ISO88591 = `iso_8859_1`;
// Windows 3.1/9x era legacy text
export const Win1252EN = `cp_1252`;

const unbsp = `\u00A0`;

export class CharacterSet {
  constructor(set = ``) {
    this.set = set;
  }
  /**
   * Unicode characters that emulate a code page set.
   * @returns {Array} Collection of matching characters
   */
  get() {
    switch (this.set) {
      case DOS437Ctrls:
        return this._cp437C0();
      case DOS437En:
        return this._cp437();
      case ISO88591:
        return this._iso88591();
      case Win1252EN:
        return this._cp1252();
      default:
        throw new Error(`Unknown character set: "${this.set}"`);
    }
  }
  /**
   * An internal table of Unicode characters that emulate Code Page 437.
   * ASCII C0 controls are replaced with characters.
   * Sets 2 through 7 are standard characters that are identical in both
   * ASCII and Unicode.
   */
  _cp437Table() {
    this.set0 = Array.from(`␀☺☻♥♦♣♠•◘○◙♂♀♪♫☼`);
    this.set1 = Array.from(`►◄↕‼¶§▬↨↑↓→←∟↔▲▼`);
    this.set8 = Array.from(`ÇüéâäàåçêëèïîìÄÅ`);
    this.set9 = Array.from(`ÉæÆôöòûùÿÖÜ¢£¥₧ƒ`);
    this.setA = Array.from(`áíóúñÑªº¿⌐¬½¼¡«»`);
    this.setB = Array.from(`░▒▓│┤╡╢╖╕╣║╗╝╜╛┐`);
    this.setC = Array.from(`└┴┬├─┼╞╟╚╔╩╦╠═╬╧`);
    this.setD = Array.from(`╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀`);
    this.setE = Array.from(`αßΓπΣσµτΦΘΩδ∞φε∩`);
    this.setF = Array.from(`≡±≥≤⌠⌡÷≈°∙·√ⁿ²■${unbsp}`);
  }
  /**
   * Unicode characters that emulate Code Page 437.
   * @returns {Array} C0 control codes
   */
  _cp437C0() {
    this._cp437Table();
    return [...this.set0, ...this.set1];
  }
  /**
   * Unicode characters that emulate Code Page 437.
   * @returns {Array} Extended characters
   */
  _cp437() {
    this._cp437Table();
    return this.set8.concat(
      this.set9,
      this.setA,
      this.setB,
      this.setC,
      this.setD,
      this.setE,
      this.setF
    );
  }
  /**
   * Unicode characters that emulate ISO 8859-1.
   * @returns {Array} Extended characters
   */
  _iso88591() {
    const sp = 32,
      tilde = 126,
      nbsp = 160,
      ÿ = 255;
    const undefinePoint = (i) => {
      if (i < sp) return true;
      if (i > tilde && i < nbsp) return true;
      if (i > ÿ) return true;
      return false;
    };
    const empty = ` `;
    let iso = [];
    for (let i = 0; i <= ÿ; i++) {
      if (undefinePoint(i)) {
        iso = [...iso, empty];
        continue;
      }
      iso = [...iso, String.fromCharCode(i)];
    }
    return iso;
  }
  /**
   * Returns a partial table of code page Windows-1252 matching characters.
   * Only rows 8 and 9 are returned as all other characters match ISO-8859-1
   * which is already supported by JavaScript.
   * @returns Array
   */
  _cp1252Table() {
    // prettier-ignore
    this.set8 = [`€`,``,`‚`,`ƒ`,`„`,`…`,`†`,`‡`,`ˆ`,`‰`,`Š`,`‹`,`Œ`,``,`Ž`,``]
    // prettier-ignore
    this.set9 = [``,`‘`,`’`,`“`,`”`,`•`,`–`,`—`,`\u02dc`,`™`,`š`,`›`,`œ`,``,`ž`,`Ÿ`]
    return [...this.set8, ...this.set9];
  }
  /**
   * Unicode characters that emulate code page Windows-1252.
   * @returns {Array} Extended characters
   */
  _cp1252() {
    const euro = 128,
      Ÿ = 159,
      ÿ = 255;
    let cp = [];
    for (let i = 0; i <= ÿ; i++) {
      if (i === euro) {
        cp = [...cp, ...this._cp1252Table()];
        i = Ÿ;
        continue;
      }
      cp = [...cp, String.fromCharCode(i)];
    }
    return cp;
  }
}
