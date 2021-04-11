# Ext Dicts For coc-spell-checker

> fork from [vscode-cspell-dict-extensions](https://github.com/streetsidesoftware/vscode-cspell-dict-extensions)

Imports the Ext spell checking dictionary for [coc-spell-checker](https://github.com/iamcco/coc-spell-checker).

Dictionaries:

- catalan `ca`
- czech `cs`
- danish `da`
- dutch `nl`
- french `fr`
- french-reforme `fr-90`
- german `de`
- greek `el`
- italian `it`
- persian `fa`
- polish `pl`
- portuguese `pt,pt_PT`
- portuguese-brazilian `pt,pt_BR`
- russian `ru`
- spanish `es`
- swedish `sv`
- turkish `tr`
- ukrainian `uk`
- medical-terms

## Installation

`:CocInstall coc-cspell-dicts`

After this extension is installed, it is necessary to tell the spell
checker to use it.

### Settings

Adding language name to the `cSpell.language` setting, will enable the Catalan dictionary.
Example using both English and Catalan dictionaries:

```javascript
"cSpellExt.enableDictionaries": ["catalan"]
"cSpell.language": "en,ca",
```

## Requirements

- [coc-spell-checker](https://github.com/iamcco/coc-spell-checker) extension.

### Buy Me A Coffee ☕️

![btc](https://img.shields.io/keybase/btc/iamcco.svg?style=popout-square)

![image](https://user-images.githubusercontent.com/5492542/42771079-962216b0-8958-11e8-81c0-520363ce1059.png)
