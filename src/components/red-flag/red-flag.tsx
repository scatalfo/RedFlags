import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './red-flag.module.scss';
import { Button, Popup, Modal, Image, Header } from 'semantic-ui-react';
import { ResultsPopup } from '../results-popup/results-popup';

export interface RedFlagProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */

export const RedFlag = ({ className }: RedFlagProps) => {
    const [open, setOpen] = useState(false);
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
            <div>
                <Header as="h1">Placeholder red flag</Header>
            </div>
            <div>
                <Popup
                    content="The Ick"
                    trigger={
                        <button
                            onClick={() => handleEmojiClick('🤮')}
                            className={styles.choiceButtons}
                        >
                            🤮
                        </button>
                    }
                />
                <Popup
                    content="Red flag"
                    trigger={
                        <button
                            onClick={() => handleEmojiClick('🚩')}
                            className={styles.choiceButtons}
                        >
                            🚩
                        </button>
                    }
                />
                <Popup
                    content="Meh"
                    trigger={
                        <button
                            onClick={() => handleEmojiClick('😐')}
                            className={styles.choiceButtons}
                        >
                            😐
                        </button>
                    }
                />
                <Popup
                    content="Love it"
                    trigger={
                        <button
                            onClick={() => handleEmojiClick('😍')}
                            className={styles.choiceButtons}
                        >
                            😍
                        </button>
                    }
                />
            </div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Submit</Button>}
            >
                <Modal.Header><center>Results</center></Modal.Header>
                <center>
                <ResultsPopup />
                </center>
                <Modal.Actions>
                    <Button
                        content="Next Red Flag"
                        labelPosition="right"
                        icon="checkmark"
                        onClick={() => setOpen(false)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );

    function handleSubmit() {
        setSelectedEmoji(null);

        // Handle the submit logic here
    }
};
