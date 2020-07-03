
'use strict';

import { Formatter, Preamble, CONSTS_FORMATTER, MARKDOWN } from './consts';
import { PROGRESS_BAR_FORMATTER } from './progress-bar.js';

export const FORMATTER =
(formatter: Formatter): string => {

	const preambleItem: number = (formatter.preamble && formatter.preamble.length) || 0;
	const preambleItemDone: number = (formatter.preamble && formatter.preamble.filter((insidePreamble: Preamble) => insidePreamble.status).length) || 0;
	const progressValue: number = Math.round((preambleItemDone * 100) / preambleItem);

	// variables to style
	const identation2 = MARKDOWN.identation.repeat(2);
	const identation4 = MARKDOWN.identation.repeat(2);
	const breakLine = MARKDOWN.breakLine;
	const item = MARKDOWN.item;
	const preambleDone = MARKDOWN.preambleDone;
	const preambleOpen = MARKDOWN.preambleOpen;

	const id: string = formatter.id ? `${formatter.id} | ` : '';
	const description: string = formatter.description;
	const status: string = CONSTS_FORMATTER(formatter.status, 'STATUS');
	const type: string = CONSTS_FORMATTER(formatter.type, 'TIPO', true);
	const components: string = CONSTS_FORMATTER(formatter.components, 'COMPONENTES', true);
	const publicationVersion: string = CONSTS_FORMATTER(formatter.publicationVersion, 'VERSÃO', true);
	const progress: string = PROGRESS_BAR_FORMATTER(progressValue);
	const preamble: string = formatter.preamble && formatter.preamble.length > 0
	? formatter.preamble.map(
		(insidePreamble: Preamble) => {
			const readyPreamble = `${identation4}${item} ${insidePreamble.description} | ${insidePreamble.status ? preambleDone : preambleOpen}`;
			const bolder = insidePreamble.accent ? MARKDOWN.bold : '';
			return `${bolder}${readyPreamble}${bolder}${breakLine}`;
		}
	).join('')
	: '';
	const obstacle: string = formatter.obstacle && formatter.obstacle.length > 0
	? (
		`! IMPEDIMENTOS:${breakLine}${formatter.obstacle.map(
			(insideObstacle: string) => `${identation4}${item} ${insideObstacle}${breakLine}`
		).join('')}`
	)
	: `Sem impedimentos`;

	return (
		`${MARKDOWN.bold}${id}${description}${MARKDOWN.bold}${breakLine}` +
		`${identation2}${status}${type}${components}${publicationVersion}${breakLine}` +
		`${identation2}${progress}${breakLine}` +
		`${preamble}${breakLine}` +
		`${identation2}${obstacle}${breakLine}`
	);
};
