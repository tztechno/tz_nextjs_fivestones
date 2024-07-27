import Square from './Square';
import styles from '../styles/Home.module.css';

type SquareValue = 'X' | 'O' | null;

interface BoardProps {
    squares: SquareValue[];
    onClick: (i: number) => void;
}

export default function Board({ squares, onClick }: BoardProps) {
    const renderSquare = (i: number) => {
        return <Square value={squares[i]} onClick={() => onClick(i)} />;
    };

    return (
        <div>
            <div className={styles.boardRow}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className={styles.boardRow}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className={styles.boardRow}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}