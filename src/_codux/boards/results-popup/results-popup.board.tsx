import { createBoard } from '@wixc3/react-board';
import { ResultsPopup } from '../../../components/results-popup/results-popup';

export default createBoard({
    name: 'ResultsPopup',
    Board: () => <ResultsPopup />,
    isSnippet: true,
});
