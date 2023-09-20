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
let votes = [1, 1, 1, 1];

export interface RedFlagProps {
    className?: string;
}

const fetchRedFlagsData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'RedFlags'));
        const rfSnapshot = querySnapshot.docs;
        const currRedFlag = rfSnapshot[rfNum].get("redFlagText");
        const votes1 = rfSnapshot[rfNum].get("votes1");
        const votes2 = rfSnapshot[rfNum].get("votes2");
        const votes3 = rfSnapshot[rfNum].get("votes3");
        const votes4 = rfSnapshot[rfNum].get("votes4");
        console.log(currRedFlag);
        rfNum++;
        return [currRedFlag, votes1, votes2, votes3, votes4];
    } catch (error) {
        console.error('Error fetching RedFlags data:', error);
    }
};

export const RedFlag = ({ className }: RedFlagProps) => {
    const [open, setOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [displayText, setDisplayText] = useState('Made this website');

    const emojiTextMap: Record<string, string> = {
        '🤮': 'The ick',
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

    const handleSubmit =  () => {
        if (selectedEmoji) {
            setOpen(true);
            switch (selectedEmoji) {
                case '🤮':
                    votes[0]++;
                    break;
                case '🚩':
                    votes[1]++;
                    break;
                case '😐':
                    votes[2]++;
                    break;
                case '😍':
                    votes[3]++;
                    break;
                default:
                    break;
            }
        }

        setSelectedEmoji(null);
    };

    const handleModalOpen =  () => {
        setOpen(true);
    };

    const handleModalClose = async () => {
        const currRedFlag = await fetchRedFlagsData();
        console.log(currRedFlag);
        if (currRedFlag === undefined) {
            return;
        }
        setDisplayText(currRedFlag[0]);
        votes[0]=currRedFlag[1];
        votes[1]=currRedFlag[2];
        votes[2]=currRedFlag[3];
        votes[3]=currRedFlag[4];    

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
