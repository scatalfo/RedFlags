import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './red-flag.module.scss';

export interface RedFlagProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const RedFlag = ({ className }: RedFlagProps) => {
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

    const emojiTextMap: Record<string, string> = {
        '🤮': 'The Ick',
        '🚩': 'Red flag',
        '😐': 'Meh',
        '😍': 'Love it',
    };

    const handleEmojiClick = (emoji: string) => {
        setSelectedEmoji(emoji);
    };

    const getSubmitButtonText = () => {
        if (selectedEmoji) {
            return emojiTextMap[selectedEmoji];
        }
        return 'Submit';
    };

    return (
        <div className={classNames(styles.root, className)}>
            Placeholder red flag
            <div>
                <button onClick={() => handleEmojiClick('🤮')} className={styles.choiceButtons}>
                    🤮
                </button>
                <button onClick={() => handleEmojiClick('🚩')} className={styles.choiceButtons}>
                    🚩
                </button>
                <button onClick={() => handleEmojiClick('😐')} className={styles.choiceButtons}>
                    😐
                </button>
                <button onClick={() => handleEmojiClick('😍')} className={styles.choiceButtons}>
                    😍
                </button>
            </div>
            <div>
                <button onClick={handleSubmit}>{getSubmitButtonText()}</button>
            </div>
        </div>
    );

    function handleSubmit() {
        setSelectedEmoji(null)
        // Handle the submit logic here
    }
};
