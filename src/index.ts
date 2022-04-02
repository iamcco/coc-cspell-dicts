import * as coc from "coc.nvim";

const dicts: Record<
  string,
  {
    local?: string;
    package: string | string[];
    newStyle?: boolean;
  }
> = {
  catalan: {
    local: "ca",
    package: "cspell-dict-ca",
  },
  czech: {
    local: "cs",
    package: "cspell-dict-cs-cz",
  },
  norwegian: {
    newStyle: true,
    local: "nb, nb-no",
    package: "@cspell/dict-nb-no",
  },
  danish: {
    local: "dk",
    package: "cspell-dict-da-dk",
  },
  dutch: {
    local: "nl",
    package: "cspell-dict-nl-nl",
  },
  french: {
    local: "fr",
    package: "cspell-dict-fr-fr",
  },
  "french-reforme": {
    local: "fr-90",
    package: "cspell-dict-fr-reforme",
  },
  german: {
    local: "de",
    package: "cspell-dict-de-de",
  },
  greek: {
    local: "el",
    package: "cspell-dict-el",
  },
  italian: {
    local: "it",
    package: "cspell-dict-it-it",
  },
  "medical-terms": {
    package: "cspell-dict-medicalterms",
  },
  persian: {
    local: "fa",
    package: "cspell-dict-fa-ir",
  },
  polish: {
    local: "pl",
    package: "cspell-dict-pl_pl",
  },
  portuguese: {
    local: "pt,pt_PT",
    package: "cspell-dict-pt-pt",
  },
  "portuguese-brazilian": {
    local: "pt,pt_BR",
    package: "cspell-dict-pt-br",
  },
  russian: {
    local: "ru",
    package: ["cspell-dict-ru_ru", "cspell-dict-russian"],
  },
  spanish: {
    local: "es",
    package: "cspell-dict-es-es",
  },
  swedish: {
    local: "sv",
    package: "cspell-dict-sv",
  },
  turkish: {
    local: "tr",
    package: "cspell-dict-tr-tr",
  },
  ukrainian: {
    local: "uk",
    package: "cspell-dict-uk-ua",
  },
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: coc.ExtensionContext) {
  const cocSpellCheckerExtension = "coc-spell-checker";

  const enableDictionaries = coc.workspace
    .getConfiguration("cSpellExt")
    .get<string[]>("enableDictionaries", []);

  // const cocSpellChecker = coc.extensions.getExtension(cocSpellCheckerExtension);
  // hack: getExtension() is not defined in coc.nvim 0.0.80 index.d.ts for some reason, so use all.find() instead
  const cocSpellChecker = coc.extensions.all.find(
    (x) => x.id === cocSpellCheckerExtension
  );

  if (cocSpellChecker) {
    cocSpellChecker.activate().then((ext) => {
      if (enableDictionaries && enableDictionaries.length) {
        enableDictionaries.forEach((lang) => {
          const dict = dicts[lang];
          if (dict) {
            if (dict.package) {
              const packages = ([] as string[]).concat(dict.package);
              packages.forEach((name) => {
                const p = dict.newStyle ? require.resolve(name) : require(name);
                if (p) {
                  const path = dict.newStyle ? p : p.getConfigLocation();
                  // We need to register the dictionary configuration with the Code Spell Checker Extension
                  ext && ext.registerConfig && ext.registerConfig(path);
                }
              });
            }
            if (dict.local) {
              // Push the disposable to the context's subscriptions so that the
              // client can be deactivated on extension deactivation
              context.subscriptions.push(
                coc.commands.registerCommand(
                  `cSpellExt_${lang}.enable`,
                  () =>
                    ext && ext.enableLocal && ext.enableLocal(true, dict.local)
                ),
                coc.commands.registerCommand(
                  `cSpellExt_${lang}.disable`,
                  () =>
                    ext &&
                    ext.disableLocal &&
                    ext.disableLocal(true, dict.local)
                ),
                coc.commands.registerCommand(
                  `cSpellExt_${lang}.enableWorkspace`,
                  () =>
                    ext && ext.enableLocal && ext.enableLocal(false, dict.local)
                ),
                coc.commands.registerCommand(
                  `cSpellExt_${lang}.disableWorkspace`,
                  () =>
                    ext &&
                    ext.disableLocal &&
                    ext.disableLocal(false, dict.local)
                )
              );
            }
          }
        });
      }
    });
  } else {
    coc.window.showMessage(
      `[coc-cspell-dicts]: require ${cocSpellCheckerExtension} extensions installed`
    );
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
