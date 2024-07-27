import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Board from '../components/Board';

type SquareValue = 'X' | 'O' | null;

export default function Home() {
    const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    const calculateWinner = (squares: SquareValue[]): SquareValue => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
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
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Tic-Tac-Toe</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Tic-Tac-Toe</h1>
                <div className={styles.game}>
                    <div className={styles.gameBoard}>
                        <Board squares={current} onClick={(i: number) => handleClick(i)} />
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