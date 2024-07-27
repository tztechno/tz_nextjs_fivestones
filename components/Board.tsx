import Square from './Square';
import styles from '../styles/Home.module.css';

type SquareValue = 'X' | 'O' | null;

interface BoardProps {
    squares: SquareValue[];
    onClick: (i: number) => void;
    size: number;  // 追加: ボードのサイズ
}

export default function Board({ squares, onClick, size }: BoardProps) {
    const renderSquare = (i: number) => {
        return <Square key={i} value={squares[i]} onClick={() => onClick(i)} />;
    };

    const renderRow = (row: number) => {
        return (
            <div key={row} className={styles.boardRow}>
                {Array(size).fill(null).map((_, col) => renderSquare(row * size + col))}
            </div>
        );
    };

    return (
        <div>
            {Array(size).fill(null).map((_, i) => renderRow(i))}
        </div>
    );
}