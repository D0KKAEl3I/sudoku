import styles from './selectbutton.module.css'

export default function SelectButton({ number, remain, ...params }) {
    return (
        <div className={styles.container} onClick={e => params.onClick(number)}>
            <p className={styles.remain}>{remain}</p>
            {number}
        </div>
    )
}