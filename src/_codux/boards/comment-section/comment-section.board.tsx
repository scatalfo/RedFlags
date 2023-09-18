import { createBoard } from '@wixc3/react-board';
import { CommentSection } from '../../../components/comment-section/comment-section';

export default createBoard({
    name: 'CommentSection',
    Board: () => <CommentSection />,
    isSnippet: true,
});
