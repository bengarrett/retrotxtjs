import { CharacterSet } from "../js/module/charset.js";
import { LegacyText } from "../js/module/text.js";

QUnit.module(`C0 character set`, function () {
  const cs = new CharacterSet(`cp437_C0`),
    c0 = new Map();
  c0.set(cs.get()[0], `␀`);
  c0.set(cs.get()[10], `◙`);
  c0.set(cs.get()[255], undefined);
  QUnit.test(`cp437_C0`, function (assert) {
    for (const c of c0.entries()) {
      assert.equal(c[0], c[1]);
    }
  });
});

QUnit.module(`CP437 character set`, function () {
  const cs = new CharacterSet(`cp_437`),
    c0 = new Map();
  c0.set(cs.get()[0], `Ç`);
  c0.set(cs.get()[128], `\u00A0`);
  c0.set(cs.get()[255], undefined);
  QUnit.test(`cp437_C0`, function (assert) {
    for (const c of c0.entries()) {
      assert.equal(c[0], c[1]);
    }
  });
});

QUnit.module(`ISO 8859-1 character set`, function () {
  const cs = new CharacterSet(`iso_8859_1`),
    c0 = new Map();
  c0.set(0, ` `);
  c0.set(32, `\u0020`);
  c0.set(126, `\u007E`);
  c0.set(127, ` `);
  c0.set(160, `\u00A0`);
  c0.set(255, `ÿ`);
  c0.set(256, undefined);
  QUnit.test(`cp437_C0`, function (assert) {
    for (const c of c0.entries()) {
      assert.equal(cs.get()[c[0]], c[1]);
    }
  });
});

QUnit.module(`Windows 1252 character set`, function () {
  const cs = new CharacterSet(`cp_1252`),
    c0 = new Map();
  c0.set(0, `\u0000`);
  c0.set(32, `\u0020`);
  c0.set(126, `\u007E`);
  c0.set(127, `\u007F`);
  c0.set(128, `€`);
  c0.set(129, ``);
  c0.set(147, `“`);
  c0.set(148, `”`);
  c0.set(160, `\u00A0`);
  c0.set(255, `ÿ`);
  c0.set(256, undefined);
  QUnit.test(`cp437_C0`, function (assert) {
    for (const c of c0.entries()) {
      assert.equal(cs.get()[c[0]], c[1]);
    }
  });
});

QUnit.module(`Normalise CP-437 text`, function () {
  const t = new Map();
  t.set(``, ``);
  t.set(`hello world`, `hello world`);
  t.set(`ÕÍÍÍÍ¾`, `╒════╛`);
  t.set(`ÕÍÍ😃ÍÍ¾`, `╒════╛`);
  t.set(`\u0001\u0002`, `☺☻`);
  t.set(`\nÍ\tÍ`, `\n═\t═`);
  QUnit.test(`CP-437`, function (assert) {
    for (const c of t.entries()) {
      const lt = new LegacyText(c[0], {
        codepage: `cp_437`,
        displayControls: true,
      });
      assert.equal(lt.normalize(), c[1]);
    }
  });
  QUnit.test(`CP-437 no display controls`, function (assert) {
    const lt = new LegacyText(`\u0001\u0002`, {
      codepage: `cp_437`,
    });
    assert.equal(lt.normalize(), ``);
  });
});

QUnit.module(`Normalise ISO 8859-1 text`, function () {
  const t = new Map();
  t.set(``, ``);
  t.set(`hello world`, `hello world`);
  t.set(`ÕÍÍÍÍ¾`, `ÕÍÍÍÍ¾`);
  t.set(`ÕÍÍ😃ÍÍ¾`, `ÕÍÍÍÍ¾`);
  t.set(`\u0001\u0002`, `  `);
  t.set(`\nÍ\tÍ`, `\nÍ\tÍ`);
  QUnit.test(`ISO 8859-1`, function (assert) {
    for (const c of t.entries()) {
      const lt = new LegacyText(c[0], {
        codepage: `iso_8859_1`,
        displayControls: false,
      });
      assert.equal(lt.normalize(), c[1]);
    }
  });
  QUnit.test(`ISO 8859-1 no display controls`, function (assert) {
    const lt = new LegacyText(`\u0001\u0002`, {
      codepage: `iso_8859_1`,
    });
    assert.equal(lt.normalize(), `  `);
  });
});

QUnit.module(`Normalise Windows-1252 text`, function () {
  const t = new Map();
  t.set(``, ``);
  t.set(`hello world`, `hello world`);
  t.set(`ÕÍÍÍÍ¾`, `ÕÍÍÍÍ¾`);
  t.set(`ÕÍÍ😃ÍÍ¾`, `ÕÍÍÍÍ¾`);
  t.set(`\u0001\u0002`, `  `);
  t.set(`\nÍ\tÍ`, `\nÍ\tÍ`);
  t.set(`\u0080999`, `€999`);
  t.set(`\u0093hello world\u0094`, `“hello world”`);
  QUnit.test(`Windows-1252`, function (assert) {
    for (const c of t.entries()) {
      const lt = new LegacyText(c[0], {
        codepage: `cp_1252`,
        displayControls: false,
      });
      assert.equal(lt.normalize(), c[1]);
    }
  });
  QUnit.test(`Windows-1252 no display controls`, function (assert) {
    const lt = new LegacyText(`\u0001\u0002`, {
      codepage: `cp_1252`,
    });
    assert.equal(lt.normalize(), `  `);
  });
});
