import { useState } from 'react';
import styles from './App.module.scss';
import { RedFlag } from './components/red-flag/red-flag';

function App() {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);

    return (
        <div className={styles.App}>
            <RedFlag />
        </div>
    );
}

export default App;
