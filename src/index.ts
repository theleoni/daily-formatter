
import { CODE_PREFIX, Formatter, Preamble } from './consts';
import { FORMATTER } from './fomatter';

import { HTMLElement, parse } from 'node-html-parser';

export default (jsonObj: any) => {

	const customFiledPublication = jsonObj.rss.channel.item.customfields.customfield.filter((e: any) => e.customfieldname === 'Versão Publicação');
	const publicationVersion = customFiledPublication && customFiledPublication.length > 0 ? customFiledPublication[0].customfieldvalues.label : null;

	const comments: HTMLElement =
	parse(
		jsonObj.rss.channel.item.comments.comment
		.filter(
			(e: string) => e.includes(CODE_PREFIX.basePanel)
		)
		.map(
			// <pre> tag it's not valid
			(e: string) => e.replace(/(<pre)/g, '<div').replace(/(<\/pre)/g, '</div')
		)
		.join('')
	);

	const preamble: Preamble[] = (
		comments.querySelectorAll(`.${CODE_PREFIX.preambleCode}`)
		.map(
			(element: HTMLElement) => element.innerHTML
			.split('\n')
		)
		// like Array.prototype.flat()
		.reduce((acc, val) => acc.concat(val), [])
		.map((e: string): Preamble => {
			const prePreable: string[] = e.split(CODE_PREFIX.preambleSeparator).map(e2 => e2.trim());
			return {
				description: prePreable[0],
				status: (prePreable[1] && prePreable[1].toLowerCase() === CODE_PREFIX.preambleCheck) || false,
			}
		})
	);

	const obstacle: string[] = comments.querySelectorAll(`.${CODE_PREFIX.obstacleCode}`)
	.map(
		(element: HTMLElement) => element.innerHTML
		.split('\n')
	)
	// like Array.prototype.flat()
	.reduce((acc, val) => acc.concat(val), [])
	.map(e => e.trim());

	const newFormatter: Formatter = {
		id: jsonObj.rss.channel.item.key,
		description: jsonObj.rss.channel.item.summary,
		type: jsonObj.rss.channel.item.priority,
		components: jsonObj.rss.channel.item.component,
		status: jsonObj.rss.channel.item.status,
		publicationVersion,
		preamble,
		obstacle,
	};

	return FORMATTER(newFormatter);
}
