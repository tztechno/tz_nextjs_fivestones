import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Board from '../components/Board';

type SquareValue = 'X' | 'O' | null;

const Home: React.FC = () => {
    const [boardSize, setBoardSize] = useState(11);
    const [history, setHistory] = useState<SquareValue[][]>([Array(boardSize * boardSize).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const calculateWinner = (squares: SquareValue[]): SquareValue => {
        const winLength = 5; // 勝利条件の連続数
        const lines: number[][] = [];

        // 横のライン
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j <= boardSize - winLength; j++) {
                lines.push(Array(winLength).fill(0).map((_, k) => i * boardSize + j + k));
            }
        }

        // 縦のライン
        for (let i = 0; i <= boardSize - winLength; i++) {
            for (let j = 0; j < boardSize; j++) {
                lines.push(Array(winLength).fill(0).map((_, k) => (i + k) * boardSize + j));
            }
        }

        // 右下がりの対角線
        for (let i = 0; i <= boardSize - winLength; i++) {
            for (let j = 0; j <= boardSize - winLength; j++) {
                lines.push(Array(winLength).fill(0).map((_, k) => (i + k) * boardSize + j + k));
            }
        }

        // 左下がりの対角線
        for (let i = 0; i <= boardSize - winLength; i++) {
            for (let j = winLength - 1; j < boardSize; j++) {
                lines.push(Array(winLength).fill(0).map((_, k) => (i + k) * boardSize + j - k));
            }
        }

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.every(index => squares[index] && squares[index] === squares[line[0]])) {
                return squares[line[0]];
            }
        }
        return null;
    };

    const handleClick = (i: number): void => {
        const currentHistory = history.slice(0, stepNumber + 1);
        const current = currentHistory[currentHistory.length - 1];
        const squares = [...current];
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...currentHistory, squares]);
        setStepNumber(currentHistory.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step: number): void => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const handleSizeChange = (newSize: number) => {
        setBoardSize(newSize);
        setHistory([Array(newSize * newSize).fill(null)]);
        setStepNumber(0);
        setXIsNext(true);
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current);

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status: string;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (current.every(square => square !== null)) {
        status = 'Draw';
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Five Stones</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Five Stones</h1>
                <div>
                    <label>
                        Board Size:
                        <select value={boardSize} onChange={(e) => handleSizeChange(Number(e.target.value))}>
                            <option value="11">11x11</option>
                            <option value="15">15x15</option>
                            <option value="19">19x19</option>
                        </select>
                    </label>
                </div>
                <div className={styles.game}>
                    <div className={styles.gameBoard}>
                        <Board
                            squares={current}
                            onClick={(i: number) => handleClick(i)}
                            size={boardSize}
                        />
                    </div>
                    <div className={styles.gameInfo}>
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;