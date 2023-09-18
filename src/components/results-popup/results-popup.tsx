import classNames from 'classnames';
import styles from './results-popup.module.scss';
import { Progress, Divider } from 'semantic-ui-react';

export interface ResultsPopupProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */

export const ResultsPopup = ({ className }: ResultsPopupProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div style={{ width: ' 450px' }}>
                <h2 className={styles.resultText}> 🤮</h2>
                <Progress percent={25} indicating progress="percent" />
            </div>
            <Divider />
            <div style={{ width: ' 450px' }}>
                <h2 className={styles.resultText}>🚩</h2>
                <Progress percent={25} indicating progress="percent" />
                <Divider />
            </div>
            <div style={{ width: ' 450px' }}>
                <h2 className={styles.resultText}>😐</h2>
                <Progress percent={25} indicating progress="percent" />
                <Divider />
            </div>
            <div style={{ width: ' 450px' }}>
                <h2 className={styles.resultText}>😍 </h2>
                <Progress percent={25} indicating progress="percent" />
                <Divider />
            </div>
        </div>
    );
};
