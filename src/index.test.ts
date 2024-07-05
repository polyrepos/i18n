import { expect, test } from "bun:test";

const fileContent1 =
	"const bbb = i18nObj(`hello-3`); const bbb = i18n`hello-4`;";

const fileContent2 = `
const aaa = i18n("hello-1");
const bbb = i18nKey('hello-2');
const ccc = i18nKey(
	"hello-5",
);
const ccc = i18nKey(
	'hello-6'
);
const ccc = i18n(
	'hello-7',
);
`;

const matchI18n = (content: string): Set<string> => {
	const result = new Set<string>();
	const reg = [
		/i18n\((`[^`]+`|'[^']+'|"[^"]+")\)/g,
		/i18n\(\s*("([^"]*)"|'([^']*)'|`([^`]*)`)\s*\)/gs,
		/i18n\(\s*("([^"]*)"|'([^']*)'|`([^`]*)`)\s*,?\s*\)/gs,
		/i18nId\((`[^`]+`|'[^']+'|"[^"]+")\)/g,
		/i18nKey\((`[^`]+`|'[^']+'|"[^"]+")\)/g,
		/i18nKey\(\s*("([^"]*)"|'([^']*)'|`([^`]*)`)\s*\)/gs,
		/i18nKey\(\s*("([^"]*)"|'([^']*)'|`([^`]*)`)\s*,?\s*\)/gs,
		/i18nObj\((`[^`]+`|'[^']+'|"[^"]+")\)/g,
		/i18nObj\(\s*("([^"]*)"|'([^']*)'|`([^`]*)`)\s*\)/gs,
		/i18nObj\(\s*("([^"]*)"|'([^']*)'|`([^`]*)`)\s*,?\s*\)/gs,
		/i18n(`[^`]+`)/g,
		/i18nId(`[^`]+`)/g,
		/i18nObj(`[^`]+`)/g,
	];
	for (const r of reg) {
		let match = null;
		// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
		while ((match = r.exec(content))) {
			const key = match[1].slice(1, -1);
			result.add(key);
		}
	}
	return result;
};

test("i18n-server match test", () => {
	const set = matchI18n(fileContent1 + fileContent2);
	expect(set.has("hello-1")).toBe(true);
	expect(set.has("hello-2")).toBe(true);
	expect(set.has("hello-3")).toBe(true);
	expect(set.has("hello-4")).toBe(true);
	expect(set.has("hello-5")).toBe(true);
	expect(set.has("hello-6")).toBe(true);
	expect(set.has("hello-7")).toBe(true);
	expect(set.size).toBe(7);
});
