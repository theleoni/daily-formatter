
'use strict';

import { /*Types, Projects, Status, */Formatter, Preamble, CONSTS_FORMATTER, MARKDOWN } from './consts';
import { PROGRESS_BAR_FORMATTER } from './progress-bar.js';

export const FORMATTER =
(formatter: Formatter): string => {

	const preambleItem: number = (formatter.preamble && formatter.preamble.length) || 0;
	const preambleItemDone: number = (formatter.preamble && formatter.preamble.filter((preamble: Preamble) => preamble.status).length) || 0;
	const progressValue: number = Math.round((preambleItemDone * 100) / preambleItem);

	// variables to style
	const id = formatter.id ? `${formatter.id} | ` : '';
	const description = formatter.description;
	const status = CONSTS_FORMATTER(formatter.status, 'STATUS');
	const type = CONSTS_FORMATTER(formatter.type, 'TIPO', true);
	const components = CONSTS_FORMATTER(formatter.components, 'COMPONENTES', true);
	const publicationVersion = CONSTS_FORMATTER(formatter.publicationVersion, 'VERSÃO', true);
	const progress = PROGRESS_BAR_FORMATTER(progressValue);

	const identation2 = MARKDOWN.identation.repeat(2);
	const identation4 = MARKDOWN.identation.repeat(2);
	const breakLine = MARKDOWN.breakLine;
	const item = MARKDOWN.item;
	const preambleDone = MARKDOWN.preambleDone;
	const preambleOpen = MARKDOWN.preambleOpen;

	return (
		`${id}${description}${breakLine}` +
		`${identation2}${status}${type}${components}${publicationVersion}${breakLine}` +
		`${identation2}${progress}${breakLine}` +
		`${(formatter.preamble && formatter.preamble.length > 0 && formatter.preamble.map(
			(preamble: Preamble) => `${identation4}${item} ${preamble.description} | ${preamble.status ? preambleDone : preambleOpen}${breakLine}`
		).join('')) || ''}${breakLine}` +
		`${identation2}${(formatter.obstacle && formatter.obstacle.length > 0 && (
			`! IMPEDIMENTOS:${breakLine}` +
			formatter.obstacle.map(
				(obstacle: string) => `${identation4}${item} ${obstacle}${breakLine}`
			).join('')
		)) || `Sem impedimentos`}${breakLine}`
	);
};
