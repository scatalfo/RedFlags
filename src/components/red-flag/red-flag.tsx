import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './red-flag.module.scss';
import { Button, Popup, Modal, Image, Header } from 'semantic-ui-react';
import { ResultsPopup } from '../results-popup/results-popup';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtIjb4LegCnZJIi8cGKO93k2kzAq0UEEc",
  authDomain: "redflags-66580.firebaseapp.com",
  projectId: "redflags-66580",
  storageBucket: "redflags-66580.appspot.com",
  messagingSenderId: "526603835693",
  appId: "1:526603835693:web:3ad24f74ccd34d916a9ba4",
  measurementId: "G-Z2J416WFPV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export interface RedFlagProps {
    className?: string;
}

export const RedFlag = ({ className }: RedFlagProps) => {
    const [open, setOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [displayText, setDisplayText] = useState('Placeholder red flag');

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

    const handleSubmit = () => {
        setSelectedEmoji(null);
    };

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
        setDisplayText('New text after modal close');
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div>
                <Header as="h1">{displayText}</Header>
            </div>
            <div>
                <button
                    onClick={() => handleEmojiClick('🤮')}
                    className={classNames(styles.choiceButtons, {
                        [styles.selected]: selectedEmoji === '🤮',
                    })}
                >
                    🤮
                </button>
                <button
                    onClick={() => handleEmojiClick('🚩')}
                    className={classNames(styles.choiceButtons, {
                        [styles.selected]: selectedEmoji === '🚩',
                    })}
                >
                    🚩
                </button>
                <button
                    onClick={() => handleEmojiClick('😐')}
                    className={classNames(styles.choiceButtons, {
                        [styles.selected]: selectedEmoji === '😐',
                    })}
                >
                    😐
                </button>
                <button
                    onClick={() => handleEmojiClick('😍')}
                    className={classNames(styles.choiceButtons, {
                        [styles.selected]: selectedEmoji === '😍',
                    })}
                >
                    😍
                </button>
            </div>
            <Modal
                onClose={handleModalClose}
                onOpen={handleModalOpen}
                open={open}
                trigger={
                    <Button onClick={handleSubmit} disabled={!selectedEmoji}>
                        {getSubmitButtonText()}
                    </Button>
                }
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
                        onClick={handleModalClose}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );
};
