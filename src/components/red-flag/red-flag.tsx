import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './red-flag.module.scss';
import { Button, Popup, Modal, Image, Header } from 'semantic-ui-react';
import { ResultsPopup } from '../results-popup/results-popup';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBtIjb4LegCnZJIi8cGKO93k2kzAq0UEEc',
    authDomain: 'redflags-66580.firebaseapp.com',
    projectId: 'redflags-66580',
    storageBucket: 'redflags-66580.appspot.com',
    messagingSenderId: '526603835693',
    appId: '1:526603835693:web:3ad24f74ccd34d916a9ba4',
    measurementId: 'G-Z2J416WFPV',
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let rfNum = 0;

export interface RedFlagProps {
    className?: string;
}

const fetchRedFlagsData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'RedFlags'));
        const rfSnapshot = querySnapshot.docs;
        const currRedFlag = rfSnapshot[rfNum].get("redFlagText");
        console.log(currRedFlag);
        rfNum++;
        return currRedFlag;
    } catch (error) {
        console.error('Error fetching RedFlags data:', error);
    }
};

export const RedFlag = ({ className }: RedFlagProps) => {
    const [open, setOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [displayText, setDisplayText] = useState('Made this website');
    const [votes, setVotes] = useState<number[]>([0, 0, 0, 0]);

    const emojiTextMap: Record<string, string> = {
        '🤮': 'The ick',
        '🚩': 'Red flag',
        '😐': 'Meh',
        '😍': 'Love it',
    };

    const handleEmojiClick = (emoji: string) => {
        setSelectedEmoji(emoji);
        switch (emoji) {
            case '🤮':
                setVotes([votes[0] + 1, votes[1], votes[2], votes[3]]);
                break;
            case '🚩':
                setVotes([votes[0], votes[1] + 1, votes[2], votes[3]]);
                break;
            case '😐':
                setVotes([votes[0], votes[1], votes[2] + 1, votes[3]]);
                break;
            case '😍':
                setVotes([votes[0], votes[1], votes[2], votes[3] + 1]);
                break;
            default:
                break;
        }
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

    const handleModalOpen = async () => {
        setOpen(true);
        const currRedFlag = await fetchRedFlagsData();
        setDisplayText(currRedFlag);
    };

    const handleModalClose = () => {
        setOpen(false);
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
                <Modal.Header>
                    <center>Results</center>
                </Modal.Header>
                <center>
                    <ResultsPopup votes={votes} />
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
