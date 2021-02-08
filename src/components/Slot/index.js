import styles from './slot.module.css'

export default function Slot({ number, checked, ...params }) {
    return (
        <div style={params.style} className={`${styles.slot} ${params.select ? styles.highlight : ''}`} onMouseDown={e => { params.functions.select(params.point) }}>{number}</div>
    )
}