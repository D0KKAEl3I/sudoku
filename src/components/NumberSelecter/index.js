import styles from './numberselecter.module.css'
import SelectButton from './SelectButton'

export default function NumberSelecter({ remainNums, ...params }) {
    return (
        <div style={params.style} className={styles.menu}>
            {
                remainNums.map((item, index) => <SelectButton onClick={params.functions.setNumber} number={index + 1} remain={item} />)
            }
        </div>
    )
}  