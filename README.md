使用方法：

1. Create a .env file in the root directory of your project with the following content:

```
OPENAI_CLIENT=sk-xxxxx
```

2. Run bunx i18n.server.ts, which will automatically translate all i18n, i18nKey, i18nObj strings in the project and generate i18n source files.

3. Use i18n strings in the project, for example:

```js
import { i18n } from "./i18n";
// This can only be used in the browser:
const a = i18n`Hello, world`;

// It will be automatically translated according to the browser's language settings, for example:
console.log(a); // 你好, 世界

// You can also manually specify the language:
const b = i18nObj`Hello, world`("ja");
console.log(b); // こんにちは世界
```

4. Use i18nKey("xxx") strings on the server side, for example:

- Use i18nKey instead of i18n because the server does not need to translate but needs to generate the corresponding translation in the i18n source files.
- Use i18nKey() instead of `i18nKey`` because template strings on the server side may have encoding issues.

```js
import { i18nKey } from "@polyrepo/i18n";
const a = i18nKey("Hello, world");
console.log(a); // Hello, world, this will not be translated but will return the original text, and will generate the corresponding translation in the i18n source file

// On the frontend, you can use `i18nFromKey`` to get the corresponding translation
// For example:
const b = i18nFromKey("Hello, world");
console.log(b); // It will output the correct language based on the browser's settings: 你好, 世界
```

5. Use the replaceI18n method on the client side to replace variables in strings, for example:

```js
import { replaceI18n } from "@polyrepo/i18n";
const a = replaceI18n(i18n`Hello, {name}`, { name: "Liam" });
console.log(a); // 你好, Liam
```
