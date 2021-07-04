/**
 * RetroTxtJS
 * js/retrotxt.js
 * © Ben Garrett, code.by.ben@gmail.com
 */
import { LegacyText, DOS437En, ISO88591, Win1252EN } from "./module/text.js";

(() => {
  const activefont = `retrotxt-active`,
    topazfont = `retrotxt-font-amiga`,
    vgafont = `retrotxt-font-msdos`,
    winfont = `retrotxt-font-windows`;

  const optAmiga = `textAmiga`,
    optDOS = `textMSDOS`,
    optWin9x = `textWin9x`,
    optWrap = `textWrap`,
    optUni = `textUnicode`,
    storeWrap = `retrotxtWrap`;

  const stylePre = `pre`,
    styleWrap = `pre-wrap`,
    unbsp = `\u00A0`;

  // pre is the text element.
  const pre = document.getElementById(`retrotxtCanvas`);
  if (pre === null) return;
  if (pre.textContent.trim().length === 0) return;

  // head is a HTML requirement to insert external CSS links.
  const head = document.getElementsByTagName(`head`);
  if (head.length === 0) return;

  // store an unmodified copy of the text.
  const original = pre.textContent;
  const parent = pre.parentNode;

  /**
   * Generate HTML elements to transform, style the text and insert these into the webpage.
   */
  class Canvas {
    constructor(set = ``) {
      this.set = set;
    }

    css() {
      const link = document.createElement(`link`);
      link.setAttribute(`rel`, `stylesheet`);
      link.setAttribute(`href`, `../css/retrotxt.css`);
      return link;
    }

    links() {
      const p = document.createElement(`p`);
      p.setAttribute(`id`, `retrotxtLinks`);
      return p;
    }

    amiga() {
      const a = document.createElement(`a`);
      a.setAttribute(`id`, optAmiga);
      a.textContent = `Amiga`;
      a.addEventListener(`click`, () => {
        this._activeLink(optAmiga);
        this._activeInfo(optAmiga);
        this._amigaToggle();
      });
      return a;
    }

    msdos() {
      const a = document.createElement(`a`);
      a.setAttribute(`id`, optDOS);
      a.textContent = `MS-DOS`;
      a.addEventListener(`click`, () => {
        this._activeLink(optDOS);
        this._activeInfo(optDOS);
        this._msdosToggle();
      });
      return a;
    }

    win9x() {
      const a = document.createElement(`a`);
      a.setAttribute(`id`, optWin9x);
      a.textContent = `Windows`;
      a.addEventListener(`click`, () => {
        this._activeLink(optWin9x);
        this._activeInfo(optWin9x);
        this._win9xToggle();
      });
      return a;
    }

    wrap() {
      const a = document.createElement(`a`);
      a.textContent = `Wrapped`;
      a.setAttribute(`id`, optWrap);
      a.setAttribute(`class`, activefont);
      a.addEventListener(`click`, (e) => {
        this._wrapToggle(e.target);
      });
      a.addEventListener(`mouseover`, () => {
        if (a.classList.contains(activefont)) {
          pre.style.whiteSpace = `${stylePre}`;
          return;
        }
        pre.style.whiteSpace = `${styleWrap}`;
      });
      a.addEventListener(`mouseleave`, () => {
        if (a.classList.contains(activefont)) {
          pre.style.whiteSpace = `${styleWrap}`;
          return;
        }
        pre.style.whiteSpace = `${stylePre}`;
      });
      return a;
    }

    unicode() {
      const a = document.createElement(`a`);
      a.setAttribute(`id`, optUni);
      a.textContent = `Unicode`;
      a.addEventListener(`click`, () => {
        this._activeLink(optUni);
        this._activeInfo(optUni);
        this._unicodeToggle();
      });
      return a;
    }

    _activeInfo(id = ``) {
      const codePage = () => {
        switch (id) {
          case optAmiga:
            return `ISO-8895-1`;
          case optDOS:
            return `CP-437`;
          case optWin9x:
            return `Windows-1252`;
          case optUni:
            return ``;
          default:
            throw new Error(`Unknown active info ID: "${id}"`);
        }
      };
      const font = document.createElement(`a`),
        p = document.getElementById(`retrotxtStatus`);
      while (p.firstChild) {
        p.removeChild(p.firstChild);
      }
      const cp = codePage();
      // As a favor, please keep these credits.
      // Also, the VGA fonts (CC) license requires attribution.
      switch (id) {
        case optUni:
          p.append(unbsp);
          return;
        case optAmiga:
          font.setAttribute(`href`, `https://github.com/rewtnull/amigafonts/`);
          font.append(`Topaz font by dMG`);
          break;
        case optDOS:
        case optWin9x:
          font.setAttribute(`href`, `https://int10h.org/oldschool-pc-fonts/`);
          font.append(`VGA font by VileR`);
          break;
        default:
          throw new Error(`Unknown active info ID: "${id}"`);
      }
      const rt = document.createElement(`a`);
      rt.setAttribute(`href`, `https://github.com/bengarrett/retrotxtjs`);
      rt.append(`RetroTxt`);
      p.append(cp, ` encoding; `, font, `, code: `, rt, `.`);
    }

    _activeLink(id = ``) {
      const p = document.getElementById(`retrotxtLinks`);
      const children = p.childNodes;
      children.forEach((item) => {
        if (item.id === optWrap) return;
        if (item.nodeType !== Node.ELEMENT_NODE) return;
        item.classList.remove(activefont);
        if (item.id === id) item.classList.add(activefont);
      });
    }

    _amigaToggle() {
      pre.classList.remove(vgafont, winfont);
      pre.classList.add(topazfont);
      const text = new LegacyText(`${original}`, {
        codepage: ISO88591,
      });
      pre.textContent = text.normalize();
    }

    _msdosToggle() {
      pre.classList.remove(topazfont, winfont);
      pre.classList.add(vgafont);
      const text = new LegacyText(`${original}`, {
        codepage: DOS437En,
        displayControls: true,
      });
      pre.textContent = text.normalize();
    }

    _wrapToggle(a) {
      if (typeof a === `undefined`) a = document.getElementById(optWrap);
      if (a.classList.contains(activefont)) {
        return this._wrapOff(a, true);
      }
      this._wrapOn(a, true);
    }

    _wrapOff(a, store) {
      if (typeof a === `undefined`) a = document.getElementById(optWrap);
      pre.style.whiteSpace = `${stylePre}`;
      a.classList.remove(activefont);
      if (store) localStorage.setItem(storeWrap, `false`);
    }

    _wrapOn(a, store) {
      if (typeof a === `undefined`) a = document.getElementById(optWrap);
      pre.style.whiteSpace = `${styleWrap}`;
      a.classList.add(activefont);
      if (store) localStorage.removeItem(storeWrap);
    }

    _win9xToggle() {
      pre.classList.remove(topazfont, vgafont);
      pre.classList.add(winfont);
      const text = new LegacyText(`${original}`, {
        codepage: Win1252EN,
      });
      pre.textContent = text.normalize();
    }

    _unicodeToggle() {
      pre.classList.remove(vgafont, topazfont, winfont);
      pre.textContent = original;
    }
  }

  const c = new Canvas();

  // apply CSS link
  head[0].append(c.css());

  // create the 'View text as:' UI and links
  const ui = c.links();
  ui.append(
    `View text as: `,
    c.unicode(),
    c.msdos(),
    c.amiga(),
    c.win9x(),
    c.wrap()
  );
  parent.insertBefore(ui, pre);

  const info = document.createElement(`p`);
  info.setAttribute(`id`, `retrotxtStatus`);
  //parent.insertBefore(info, pre);
  parent.append(info);

  // implement saved wrap state, it is otherwise enabled by default
  if (localStorage.getItem(storeWrap) === `false`) c._wrapOff(undefined, true);

  // select the default view
  if (pre.classList.contains(`retrotxt-msdos`)) {
    c.msdos().click();
    return;
  }
  if (pre.classList.contains(`retrotxt-amiga`)) {
    c.amiga().click();
    return;
  }
  if (pre.classList.contains(`retrotxt-windows`)) {
    c.win9x().click();
    return;
  }
  c.unicode().click();
})();
