import classNames from 'classnames';
import styles from './results-popup.module.scss';
import { Progress } from 'semantic-ui-react';

export interface ResultsPopupProps {
    className?: string;
    votes?: number[]; // Make the votes prop optional
}

export const ResultsPopup = ({ className, votes = [1, 1, 1, 1] }: ResultsPopupProps) => {
    // Calculate the total number of votes
    const totalVotes = votes.reduce((acc, vote) => acc + vote, 0);

    return (
        <div className={classNames(styles.root, className)}>
            {votes.map((vote, index) => (
                <div style={{ width: '450px' }} key={index}>
                    {getEmojiForVote(index)} {/* Display the emoji */}
                    <Progress
                        percent={((vote / totalVotes) * 100)}
                        indicating
                        progress="percent"
                        className={styles.resultBar}
                        precision={0}
                    />
                </div>
            ))}
        </div>
    );
};

// Helper function to get emoji for a vote
function getEmojiForVote(index: number): JSX.Element {
    switch (index) {
        case 0:
            return <h2 className={styles.resultText}> 🤮</h2>;
        case 1:
            return <h2 className={styles.resultText}> 🚩</h2>;
        case 2:
            return <h2 className={styles.resultText}> 😐</h2>;
        case 3:
            return <h2 className={styles.resultText}> 😍</h2>;
        default:
            return <></>;
    }
}
