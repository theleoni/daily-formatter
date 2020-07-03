
export const MARKDOWN = {
	bold: '**',
	italic: '*',
	strikethrough: '~~',
	code: '```',
	identation: ' ',
	item: '+',
	breakLine: '\n',
	preambleDone: 'V',
	preambleOpen: 'X',
};

export const CODE_PREFIX = {
	basePanel: 'code panel',
	preambleCode: 'code-actionscript',
	obstacleCode: 'code-ada',
	preambleSeparator: '|',
	preambleCheck: 'v',
	preambleCheckAccent: 'vv',
}

export interface Formatter {
	id?: string;
	description: string;
	type: string;
	components: string | string[];
	publicationVersion?: string,
	status?: string,
	preamble?: Preamble[],
	obstacle?: string[],
};

export interface Preamble {
	description: string,
	status: boolean,
	accent: boolean,
}

export const EXTRA_SPACE_FORMATTER =
(addExtraSpace: boolean | undefined): string => {

	return addExtraSpace ? MARKDOWN.identation.repeat(2) : '';
};

export const PREFIX_FORMATTER =
(prefix: string | undefined): string => {

	return prefix ? `${prefix}:${MARKDOWN.identation.repeat(1)}` : '';
};

export const CONSTS_FORMATTER =
(toFormat: string | string[] | undefined, prefix?: string, addExtraSpace?: boolean): string => {

	if (!toFormat) return '';

	return `${EXTRA_SPACE_FORMATTER(addExtraSpace)}[${PREFIX_FORMATTER(prefix)}${
		Array.isArray(toFormat)
		? toFormat.join(' | ').toUpperCase()
		: toFormat.toUpperCase()
	}]`;
};
