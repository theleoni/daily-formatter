
import { EXTRA_SPACE_FORMATTER } from './consts';

const SIZE: number = 56; // 73
const TYPE_DONE: string = '#';
const TYPE_LEFT: string = '.';

const GET_RIGHT_PERCENTAGE = (percentage: number): number => {

	if (!percentage) return 0;

	return percentage > 0 ? ( percentage > 100 ? 100 : percentage ) : 0;
};

export const PROGRESS_BAR_FORMATTER =
(percentage: number, progressBarSize: number = SIZE, addExtraSpace?: boolean): string => {

	const finalPercentage = GET_RIGHT_PERCENTAGE(percentage);

	const progressDone = Math.round((finalPercentage * progressBarSize) / 100);
	const progressLeft = progressBarSize - progressDone;

	const progressDoneType = TYPE_DONE.repeat(progressDone);
	const progressLeftType = TYPE_LEFT.repeat(progressLeft);

	return `${EXTRA_SPACE_FORMATTER(addExtraSpace)}[${progressDoneType}${progressLeftType}] ${finalPercentage}%`;
}
