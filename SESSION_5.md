# Session 5 : Débogage, tests et performance

Liens utiles :
- https://code.visualstudio.com/docs/nodejs/nodejs-debugging
- https://code.visualstudio.com/docs/nodejs/profiling
- https://nodejs.org/en/learn/diagnostics/flame-graphs


Si la lib `perl-open` est manquante pour FlameGraph, l'installer :
```
sudo dnf install perl-open
```

## Debug avec VSCode

Pour exécuter un script directement depuis VSCode, sélectionner le fichier à exécuter, puis dans le **Menu VSCode** `Run` > `Run without debugging` (ou `Start debugging`).

Essayer d'exécuter `server.js` normalement, puis avec le mode debug activé et en ajoutant un point d'arrêt directement dans l'éditeur sur le fichier.

On peut avoir recours à l'ajout de ligne de type `console.log(...)` pour afficher des informations dans la sortie standard, mais il ne faut pas en abuser dans des boucles ou éviter de laisser ce type de ligne temporaire en Prod.


## Testing

Il existe plusieurs outils pour écrire et exécuter des tests : mocha, jasmine, jest. Ici, nous allons utiliser simplement `jest`.

Ecrire les 2 exemples de fichier suivants.

Fichier `addition.js`

```
function addition(a, b) {
    return a - b; // erreur volontaire, devrait être a + b
}

module.exports = addition;
```

Fichier de test `addition.test.js`
```
const addition = require("./addition");

test("addition de 2 et 3 doit retourner 5", () => {
    expect(addition(2, 3)).toBe(5);
});

```

Installer la dépendance dans le projet :
```
npm i -D jest
```

Ajouter la ligne `"test": "jest"` dans le fichier de configuration `package.json`.
```
"scripts": {
  "test": "jest"
}
```

Puis dans le terminal, à la racine du projet, exécuter la commande :
```
npm test
```

## Profiling et linter

Avec NodeJS, l'option `--prof` permet de générer dans un fichier `isolate-0x....log` des données de "profile".

```
node --prof server.js
node --prof-process isolate-0x....log > processed.txt
```

Ajouter un linter sur le projet pour lancer des vérifications sur le code source, avant exécution.
```
npm init @eslint/config@latest
```
(ou `npx eslint --init`)

Exemple du fichier `eslint.config.mjs` :
```
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  {
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn",
		},
	},
]);
```