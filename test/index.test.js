var postcss = require('postcss');

var plugin = require('../');

function run(input, output, opts) {
  return postcss([plugin(opts)]).process(input)
    .then(result => {
      console.log(result.css);
      // expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

it('test Cols', () => {
  const input = `
  .no-gutters > .col,
  .no-gutters > [class*="col-"] {
    padding-right: 0;
    padding-left: 0;
  }
    `;
  const output = `    ._li {
        display: list-item;
    }
    ._ol {
        list-style-type: decimal;
        padding-left: 1.15rpx;
    }
    ._ul ._ul {
        list-style-type: circle;
    }
    ._ul {
        list-style-type: disc;
        padding-left: 1.15rpx;
    }
    text,
        text::before,
        text::after {
        box-sizing: border-box;
    }
    view,
        view::before,
        view::after {
        box-sizing: border-box;
    }
    .no-gutters > .col,
      .no-gutters > .col-1,
      .no-gutters > .col-2,
      .no-gutters > .col-3,
      .no-gutters > .col-4,
      .no-gutters > .col-5,
      .no-gutters > .col-6,
      .no-gutters > .col-7,
      .no-gutters > .col-8,
      .no-gutters > .col-9,
      .no-gutters > .col-10,
      .no-gutters > .col-11,
      .no-gutters > .col-12,
      .no-gutters >  .col-auto,
      .no-gutters > .col-sm-1,
      .no-gutters > .col-sm-2,
      .no-gutters > .col-sm-3,
      .no-gutters > .col-sm-4,
      .no-gutters > .col-sm-5,
      .no-gutters > .col-sm-6,
      .no-gutters > .col-sm-7,
      .no-gutters > .col-sm-8,
      .no-gutters > .col-sm-9,
      .no-gutters > .col-sm-10,
      .no-gutters > .col-sm-11,
      .no-gutters > .col-sm-12,
      .no-gutters > .col-sm,
      .no-gutters > .col-sm-auto,
      .no-gutters > .col-md-1,
      .no-gutters > .col-md-2,
      .no-gutters > .col-md-3,
      .no-gutters > .col-md-4,
      .no-gutters > .col-md-5,
      .no-gutters > .col-md-6,
      .no-gutters > .col-md-7,
      .no-gutters > .col-md-8,
      .no-gutters > .col-md-9,
      .no-gutters > .col-md-10,
      .no-gutters > .col-md-11,
      .no-gutters > .col-md-12,
      .no-gutters > .col-md,
      .no-gutters > .col-md-auto,
      .no-gutters > .col-lg-1,
      .no-gutters > .col-lg-2,
      .no-gutters > .col-lg-3,
      .no-gutters > .col-lg-4,
      .no-gutters > .col-lg-5,
      .no-gutters > .col-lg-6,
      .no-gutters > .col-lg-7,
      .no-gutters > .col-lg-8,
      .no-gutters > .col-lg-9,
      .no-gutters > .col-lg-10,
      .no-gutters > .col-lg-11,
      .no-gutters > .col-lg-12,
      .no-gutters > .col-lg,
      .no-gutters > .col-lg-auto,
      .no-gutters > .col-xl-1,
      .no-gutters > .col-xl-2,
      .no-gutters > .col-xl-3,
      .no-gutters > .col-xl-4,
      .no-gutters > .col-xl-5,
      .no-gutters > .col-xl-6,
      .no-gutters > .col-xl-7,
      .no-gutters > .col-xl-8,
      .no-gutters > .col-xl-9,
      .no-gutters > .col-xl-10,
      .no-gutters > .col-xl-11,
      .no-gutters > .col-xl-12,
      .no-gutters > .col-xl,
      .no-gutters > .col-xl-auto {
        padding-right: 0;
        padding-left: 0;
      }`;
  const options = {};
  return run(input, output, options);
});
