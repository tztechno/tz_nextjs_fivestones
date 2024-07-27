import styles from '../styles/Home.module.css';

interface SquareProps {
    value: 'X' | 'O' | null;
    onClick: () => void;
}

export default function Square({ value, onClick }: SquareProps) {
    return (
        <button className= { styles.square } onClick = { onClick } >
            { value }
            </button>
  );
}