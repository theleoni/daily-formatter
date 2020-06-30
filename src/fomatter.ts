
'use strict';

import { /*Types, Projects, Status, */Formatter, CONSTS_FORMATTER } from './consts';
import { PROGRESS_BAR_FORMATTER } from './progress-bar.js';

export const FORMATTER =
(formatter: Formatter): string => {

	return (
		`[   ]${CONSTS_FORMATTER(formatter.type, true)}${CONSTS_FORMATTER(formatter.projects)}
		${formatter.id ? `${formatter.id} | ` : ''}${formatter.description}
		${CONSTS_FORMATTER(formatter.status)}${PROGRESS_BAR_FORMATTER(formatter.progress)}`
	);
};

/*
[ ! ]  [NORMAL]  [PWA | API]
STT-218 | Cartão de débito Itaú
[DESEN] [###############........................................] 23%

[ V ]  [FASTPASS]  [PWA | API | ECOS]
STT-212 | Cartão de crédito caixa
[MERGE] [#################################......................] 75%

! Impedimentos:
               STT-218
                + falta layout para implementação no PWA
                + não foi possível contactar solicitante
*/
