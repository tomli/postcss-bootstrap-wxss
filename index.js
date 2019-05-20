const postcss = require('postcss');
const selectorParser = require('postcss-selector-parser');
const postcssMpvueWxss = require('postcss-mpvue-wxss');


const defConfig = {
  remToRpx: 35
};

// const replaceCharInSelector = {:'+'}
const invaildColStr = ' > [class*="col-"]';
const invaildColStrCmprsed = '>[class*="col-"]';
const colSelectorsStr =  '.col-1,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-10,.col-11,.col-12,' +
  ' .col-auto,.col-sm-1,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm,' +
  '.col-sm-auto,.col-md-1,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-10,.col-md-11,.col-md-12,.col-md,' +
  '.col-md-auto,.col-lg-1,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg,' +
  '.col-lg-auto,.col-xl-1,.col-xl-2,.col-xl-3,.col-xl-4,.col-xl-5,.col-xl-6,.col-xl-7,.col-xl-8,.col-xl-9,.col-xl-10,.col-xl-11,.col-xl-12,.col-xl,' +
  '.col-xl-auto';
const colSelectors = colSelectorsStr.split(',');

module.exports = postcss.plugin('postcss-bootstrap-wxss', options => {

  options = Object.assign({}, defConfig, options);
  return function (root) {

    var fontSizeBase = '1rem';

    root.walkRules(rule => {

      if(rule.selector === 'page'){
        rule.walkDecls('font-size', decl => {
          fontSizeBase = decl.value;
        })
      }

      if(rule.selector === '.form-control'){
        rule.walkDecls('width', decl => {
          if(decl.value === '100%'){
            // const buttonface = postcss.decl({ prop: 'border-style', value: 'outset' });
            // decl.parent.append(buttonface);
            decl.remove();
          }
        });
      }

      const { selector } = rule || {};
      if(hasInvaildColStr(rule.selector)) {

        var ruleSelectors = rule.selector.split(',');
        var safeColSelectors = [];
        ruleSelectors.forEach(function (ruleSelector) {
          if(hasInvaildColStr(ruleSelector)){
            var parentSelector = ruleSelector.replace(invaildColStr, '');
            parentSelector = parentSelector.replace(invaildColStrCmprsed, '');
            var unfoldSelectors = colSelectors.map( colSelector => parentSelector+' > '+colSelector);
            safeColSelectors = safeColSelectors.concat(unfoldSelectors);
          }else{
            safeColSelectors.push(ruleSelector);
          }
        });
        // var safeColSelectors = [];
        // colSelectors.forEach(function (colSelector) {
        //   safeColSelectors.push(parentSelector+' > '+colSelector);
        // });
        rule.selector =  safeColSelectors.join(', ');
      }

      rule.selector = rule.selector.replace(/.~/ig, str => {
        return '+';
      });

      /*

            for (var k in replaceCharInSelector) {
              if (replaceCharInSelector.hasOwnProperty(k)) {
              }
            }

            if(hasInvaildChar(rule.selector)) {
              rule.selector = selectorParser(function (selectors) {
                selectors.each(function (selector) {
                  selector.each(function (n) {
                    // 转换 tag 选择器
                    if (n.type === 'tag') {
                      const k = n.value;
                    }
                    // 清理不支持的选择器
                    if ([].includes(n.value)) {
                      // return n.value = 'view';
                      return rule.remove();
                    }
                  })
                })
              }).process(selector).result;
            }*/
    });

    root.walkDecls('-webkit-appearance', decl => {
      if(decl.value === 'button'){
        // const buttonface = postcss.decl({ prop: 'border-style', value: 'outset' });
        // decl.parent.append(buttonface);
        decl.remove();
      }
    });

    //add border-box model for view (to be removed after https://github.com/mpvue/postcss-mpvue-wxss/pull/2 accepted)
    const rule_view = postcss.rule({ selector: 'view,\n' +
    '    view::before,\n' +
    '    view::after' })
    rule_view.append({ prop: 'box-sizing', value: 'border-box'})
    root.prepend(rule_view)

    //add border-box model for text
    const rule_text = postcss.rule({ selector: 'text,\n' +
    '    text::before,\n' +
    '    text::after' })
    rule_text.append({ prop: 'box-sizing', value: 'border-box'})
    root.prepend(rule_text)

    //add ul and li support
    const rule_ul = postcss.rule({ selector: '._ul' })
    const paddingLeft = 1.15 * parseFloat(fontSizeBase) + 'rpx'
    rule_ul.append({ prop: 'list-style-type', value: 'disc' })
    rule_ul.append({ prop: 'padding-left', value: paddingLeft})
    root.prepend(rule_ul)

    const rule_ul_ul = postcss.rule({ selector: '._ul ._ul' })
    rule_ul_ul.append({ prop: 'list-style-type', value: 'circle' })
    root.prepend(rule_ul_ul)

    const rule_ol = postcss.rule({ selector: '._ol' })
    rule_ol.append({ prop: 'list-style-type', value: 'decimal' })
    rule_ol.append({ prop: 'padding-left', value: paddingLeft})
    root.prepend(rule_ol)

    const rule_li = postcss.rule({ selector: '._li' })
    rule_li.append({ prop: 'display', value: 'list-item' })
    root.prepend(rule_li)

  };
});


function hasInvaildColStr(selector) {
  return selector.indexOf(invaildColStr) > 0 || selector.indexOf(invaildColStrCmprsed) > 0;
}
/*
function hasInvaildChar(selector) {
  for (var k in replaceCharInSelector) {
    if (replaceCharInSelector.hasOwnProperty(k) && selector.indexOf(replaceCharInSelector[k]) >0 ) {
      return true;
    }
  }
  return false;
}*/
