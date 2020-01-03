import * as coc from "coc.nvim";

const dicts: Record<
  string,
  {
    local?: string;
    package: string | string[];
  }
> = {
  catalan: {
    local: "ca",
    package: "cspell-dict-ca"
  },
  czech: {
    local: "cs",
    package: "cspell-dict-cs-cz"
  },
  danish: {
    local: "dk",
    package: "cspell-dict-da-dk"
  },
  dutch: {
    local: "nl",
    package: "cspell-dict-nl-nl"
  },
  french: {
    local: "fr",
    package: "cspell-dict-fr-fr"
  },
  "french-reforme": {
    local: "fr-90",
    package: "cspell-dict-fr-reforme"
  },
  german: {
    local: "de",
    package: "cspell-dict-de-de"
  },
  greek: {
    local: "el",
    package: "cspell-dict-el"
  },
  italian: {
    local: "it",
    package: "cspell-dict-it-it"
  },
  "medical-terms": {
    package: "cspell-dict-medicalterms"
  },
  persian: {
    local: "fa",
    package: "cspell-dict-fa-ir"
  },
  polish: {
    local: "pl",
    package: "cspell-dict-pl_pl"
  },
  portuguese: {
    local: "pt,pt_PT",
    package: "cspell-dict-pt-pt"
  },
  "portuguese-brazilian": {
    local: "pt,pt_BR",
    package: "cspell-dict-pt-br"
  },
  russian: {
    local: "ru",
    package: ["cspell-dict-ru_ru", "cspell-dict-russian"]
  },
  spanish: {
    local: "es",
    package: "cspell-dict-es-es"
  },
  swedish: {
    local: "sv",
    package: "cspell-dict-sv"
  },
  turkish: {
    local: "tr",
    package: "cspell-dict-tr-tr"
  },
  ukrainian: {
    local: "uk",
    package: "cspell-dict-uk-ua"
  }
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: coc.ExtensionContext) {
  const cocSpellCheckerExtension = "coc-spell-checker";

  const enableDictionaries = coc.workspace
    .getConfiguration("cSpellExt")
    .get<string[]>("enableDictionaries", []);

  const extension = coc.extensions.getExtension(cocSpellCheckerExtension)
    .extension;

  if (extension) {
    extension.activate().then(ext => {
      if (enableDictionaries && enableDictionaries.length) {
        enableDictionaries.forEach(lang => {
          const dict = dicts[lang]
          if (dict) {
            if (dict.package) {
              const packages = ([] as string[]).concat(dict.package)
              packages.forEach(name => {
                const p = require(name)
                if (p) {
                  const path = p.getConfigLocation();
                  // We need to register the dictionary configuration with the Code Spell Checker Extension
                  ext && ext.registerConfig && ext.registerConfig(path);
                }
              })
            }
            if (dict.local) {
              // Push the disposable to the context's subscriptions so that the
              // client can be deactivated on extension deactivation
              context.subscriptions.push(
                coc.commands.registerCommand(`cSpellExt_${lang}.enableCatalan`, () =>
                  ext && ext.enableLocal && ext.enableLocal(true, dict.local)
                ),
                coc.commands.registerCommand(`cSpellExt_${lang}.disableCatalan`, () =>
                  ext && ext.disableLocal && ext.disableLocal(true, dict.local)
                ),
                coc.commands.registerCommand(
                  `cSpellExt_${lang}.enableCatalanWorkspace`,
                  () => ext && ext.enableLocal && ext.enableLocal(false, dict.local)
                ),
                coc.commands.registerCommand(
                  `cSpellExt_${lang}.disableCatalanWorkspace`,
                  () => ext && ext.disableLocal && ext.disableLocal(false, dict.local)
                )
              );
            }
          }
        });
      }
    });
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
