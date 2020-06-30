
export enum Types {
	EXPRESSO = 'EXPRESSO',
	NORMAL = 'NORMAL',
	FASTPASS = 'FASTPASS',
	PROJETO = 'PROJETO',
	ERRO = 'ERRO',
};

export enum Projects {
	PWA = 'PWA',
	ADMCLI = 'ADMCLI',
	API = 'API',
	ECOS = 'ECOS',
	GTM = 'GTM',
	SPLAN = 'SPLAN',
};

export enum Status {
	ANALISE = '+INFO',
	DESENVOLVENDO = 'DESEN',
	MERGE = 'MERGE',
	TESTE = 'TESTE',
	CONCLUIDO = 'CONCL',
};

export interface Formatter {
	id?: string;
	description: string;
	type: Types;
	projects: Projects[];
	status?: Status,
	progress: number,
};

export const EXTRA_SPACE_FORMATTER =
(addExtraSpace: boolean = false): string => {
	return addExtraSpace ? '  ' : '';
};


export const CONSTS_FORMATTER =
(toFormat: Status | Types | Projects[], addExtraSpace?: boolean): string => {

	if (!toFormat) return '';

	return `[${EXTRA_SPACE_FORMATTER(addExtraSpace)}${
		Array.isArray(toFormat)
		? toFormat.join(' | ')
		: toFormat
	}]`;
};
