
'use strict';

import { /*Types, Projects, Status, */Formatter, Preamble, CONSTS_FORMATTER, MARKDOWN } from './consts';
import { PROGRESS_BAR_FORMATTER } from './progress-bar.js';

export const FORMATTER =
(formatter: Formatter): string => {

	const preambleItem: number = (formatter.preamble && formatter.preamble.length) || 0;
	const preambleItemDone: number = (formatter.preamble && formatter.preamble.filter((preamble: Preamble) => preamble.status).length) || 0;
	const progress: number = (preambleItemDone * 100) / preambleItem;

	return (
		`${formatter.id ? `${formatter.id} | ` : ''}${formatter.description}${MARKDOWN.breakLine}` +
		`${CONSTS_FORMATTER(formatter.status, 'STATUS')}${CONSTS_FORMATTER(formatter.type, 'TIPO', true)}${CONSTS_FORMATTER(formatter.components, 'COMPONENTES', true)}${MARKDOWN.breakLine}` +
		`${PROGRESS_BAR_FORMATTER(progress)}${MARKDOWN.breakLine}` +
		`${(formatter.preamble && formatter.preamble.map(
			(preamble: Preamble) => `${MARKDOWN.identation.repeat(4)}${MARKDOWN.item} ${preamble.description} | ${preamble.status ? MARKDOWN.preambleDone : MARKDOWN.preambleOpen}${MARKDOWN.breakLine}`
		).join('')) || ''}${MARKDOWN.breakLine}` +
		`${MARKDOWN.identation.repeat(2)}${(formatter.obstacle && formatter.obstacle.length > 0 && (
			`! IMPEDIMENTOS:${MARKDOWN.breakLine}` +
			formatter.obstacle.map(
				(obstacle: string) => `${MARKDOWN.identation.repeat(4)}${MARKDOWN.item} ${obstacle}${MARKDOWN.breakLine}`
			).join('')
		)) || ` Sem impedimentos`}${MARKDOWN.breakLine}`
	);
};
