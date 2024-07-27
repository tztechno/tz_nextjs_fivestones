import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Board from '../components/Board';

type SquareValue = 'X' | 'O' | null;

export default function Home() {
    const [boardSize, setBoardSize] = useState<number>(3);
    const [history, setHistory] = useState<SquareValue[][]>([Array(boardSize * boardSize).fill(null)]);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    const calculateWinner = (squares: SquareValue[]): SquareValue => {
        const lines = [];
        // 横のライン
        for (let i = 0; i < boardSize; i++) {
            lines.push(Array(boardSize).fill(0).map((_, j) => i * boardSize + j));
        }
        // 縦のライン
        for (let i = 0; i < boardSize; i++) {
            lines.push(Array(boardSize).fill(0).map((_, j) => j * boardSize + i));
        }
        // 対角線
        lines.push(Array(boardSize).fill(0).map((_, i) => i * boardSize + i));
        lines.push(Array(boardSize).fill(0).map((_, i) => i * boardSize + (boardSize - 1 - i)));

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

    const handleSizeChange = (newSize: number) => {
        setBoardSize(newSize);
        setHistory([Array(newSize * newSize).fill(null)]);
        setStepNumber(0);
        setXIsNext(true);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Tic-Tac-Toe</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Tic-Tac-Toe</h1>
                <div>
                    <label>
                        Board Size:
                        <select value={boardSize} onChange={(e) => handleSizeChange(Number(e.target.value))}>
                            <option value="3">3x3</option>
                            <option value="4">4x4</option>
                            <option value="5">5x5</option>
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
}