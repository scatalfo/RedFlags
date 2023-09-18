import { createBoard } from '@wixc3/react-board';
import { RedFlag } from '../../../components/red-flag/red-flag';

export default createBoard({
    name: 'RedFlag',
    Board: () => <RedFlag />,
    isSnippet: true,
});
