import { useEffect, useState } from 'react'
import NumberSelecter from 'components/NumberSelecter'
import Slot from 'components/Slot'
import styles from './index.module.css'

export default function Index() {
    const [slots, setSlots] = useState([])
    useEffect(() => {
        let arr = []

        for (let y = 0; y < 9; y++) {
            let row = []
            for (let x = 0; x < 9; x++) {
                row.push({ number: null, checked: [], point: { x: x, y: y }, select: false, correct: true })
            }
            arr.push(row)
        }
        setSlots(arr)
    }, [])

    useEffect(() => {
        if (selectedSlotPoint.x && selectedSlotPoint.y) {
            let checked = check(selectedSlotPoint)
            setSlots(arr => {
                let res = [...arr]
                res[selectedSlotPoint.y][selectedSlotPoint.y].checked = checked
                return res
            })
        }
    }, [slots])

    const check = point => {
        if (point.x && point.y) {
            let number = slots[point.y][point.x].number
            //row
            for (let i in slots[point.y]) {
                if (slots[point.y][i].point != point && slots[point.y][i].number == number) return false
            }
            //column
            for (let i in slots) {
                if (slots[i][point.x].point != point && slots[i][point.x].number == number) return false
            }

            //block

            return true
        }
    }

    const [selectedSlotPoint, setSelectedSlotPoint] = useState({ x: null, y: null })

    const select = (point) => {
        setSelectedSlotPoint(point)
    }

    useEffect(() => {
        setSlots(arr => {
            arr = [...arr]
            //reset
            for (let y = 0; y < arr.length; y++) {
                for (let x = 0; x < arr[y].length; x++) {
                    arr[y][x].select = false
                }
            }
            //set
            if (selectedSlotPoint.x && selectedSlotPoint.y) {
                arr[selectedSlotPoint.y][selectedSlotPoint.x].select = true
            } return arr
        })
    }, [selectedSlotPoint])

    const setNumber = (number) => {
        if (selectedSlotPoint.x && selectedSlotPoint.y) {
            let { x, y } = selectedSlotPoint
            setSlots(arr => {
                arr = [...arr]
                arr[y][x].number = number
                return arr;
            })
        }
    }

    const [remainNums, setRemainNums] = useState([9, 9, 9, 9, 9, 9, 9, 9, 9])

    return (
        <div onClick={e => {
            console.log(e.currentTarget == e.target)
            if (e.currentTarget == e.target) setSelectedSlotPoint({ x: null, y: null })
        }}>
            <div className={styles.slotContainer}>
                {
                    slots.map(row => row.map(item => <Slot select={item.select} number={item.number} checked={item.checked} point={item.point} functions={{ select }} />))
                }
            </div>
            <NumberSelecter functions={{ setNumber }} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)' }} remainNums={remainNums} />
        </div>
    )
}