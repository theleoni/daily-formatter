
'use strict';

import { Formatter, Preamble, CONSTS_FORMATTER, MARKDOWN as M } from './consts';
import { PROGRESS_BAR_FORMATTER } from './progress-bar.js';

// variables to style
const i2 = M.identation.repeat(2);
const i4 = M.identation.repeat(4);

export const FORMATTER =
(formatter: Formatter): string => {

	const preambleItem: number = (formatter.preamble && formatter.preamble.length) || 0;
	const preambleItemDone: number = (formatter.preamble && formatter.preamble.filter((insidePreamble: Preamble) => insidePreamble.status).length) || 0;
	const progressValue: number = Math.round((preambleItemDone * 100) / preambleItem);

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
			// const item = insidePreamble.accent ? M.preambleDoneAccent : (insidePreamble.status ? M.preambleOpen : M.preambleOpen);
			const item = insidePreamble.status ? M.preambleDone : M.preambleOpen;
			const accent = insidePreamble.accent ? M.bold : '';
			return `${i4}${accent}${item} | ${insidePreamble.description}${accent}`;
		}
	).join(M.breakLine) + M.breakLine
	: '';

	const obstacle: string = formatter.obstacle && formatter.obstacle.length > 0
	? `${i2}${M.obstacle} IMPEDIMENTOS:${M.breakLine}${formatter.obstacle.map(
		(insideObstacle: string) => `${i4}${M.item} ${insideObstacle}`
	).join(M.breakLine)}` + M.breakLine
	: '';

	return (
		`${M.bold}${id}${description}${M.bold}${M.breakLine}` +
		`${i2}${status}${type}${components}${publicationVersion}${M.breakLine}` +
		`${i2}${progress}${M.breakLine}` +
		`${preamble}` +
		`${obstacle}`
	);
};
