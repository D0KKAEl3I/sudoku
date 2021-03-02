import { useEffect, useState } from 'react'
import NumberSelecter from 'components/NumberSelecter'
import Slot from 'components/Slot'
import styles from './index.module.css'

export default function Index() {
    const [loading, setLoading] = useState(false)

    const [slots, setSlots] = useState([])

    useEffect(() => {
        setLoading(true)
        let arr = [];
        let remainRandomNumber = 11;
        for (let y = 0; y < 9; y++) {
            let row = []
            for (let x = 0; x < 9; x++) {
                row.push({ number: null, checked: [], point: { x: x, y: y }, select: false, correct: false })
            }
            arr.push(row)
        }
        setSlots(arr)
        setLoading(false)
    }, [])

    useEffect(() => {
        if (!setLoading) {
            for (let y = 0; y < slots.length; y++) {
                for (let x = 0; x < slots[y].length; x++) {
                    console.log(slots[y][x].correct)
                    if (!slots[y][x].correct) return
                }
            }
            alert('congratulations')
        }
    }, [slots])

    const [selectedSlotPoint, setSelectedSlotPoint] = useState({ x: null, y: null })

    const select = (point) => {
        setSelectedSlotPoint(point)
    }

    const check = (point, number) => {
        if (point.x && point.y) {
            let checked = true;
            //cross check
            for (let i = 0; i < slots.length; i++) {
                //row
                if (slots[point.y][i].point != point && slots[point.y][i].number == number) checked = false
                //column
                else if (slots[i][point.x].point != point && slots[i][point.x].number == number) checked = false
            }
            //block check
            let Ygap = point.y - point.y % 3
            for (let y = Ygap; y < Ygap + 3; y++) {
                let Xgap = point.x - point.x % 3
                for (let x = Xgap; x < Xgap + 3; x++) {
                    if (slots[y][x].number == number && slots[y][x].point != point) checked = false
                }
            }
            return checked
        }
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
            if (typeof selectedSlotPoint.x == 'number' && typeof selectedSlotPoint.y == 'number') {
                if (0 <= selectedSlotPoint.x <= 8 && 0 <= selectedSlotPoint.y <= 8) {
                    arr[selectedSlotPoint.y][selectedSlotPoint.x].select = true
                }
            } return arr
        })
    }, [selectedSlotPoint])

    const setNumber = (number) => {
        let { x, y } = selectedSlotPoint
        if (typeof x == 'number' && typeof y == 'number') {
            setSlots(arr => {
                arr = [...arr]
                arr[y][x].number = number
                arr[y][x].correct = check(selectedSlotPoint, number, slots)
                return arr
            })
        }
    }

    const [remainNums, setRemainNums] = useState([9, 9, 9, 9, 9, 9, 9, 9, 9])

    return (
        <div>
            {
                loading ?
                    ''
                    :
                    <div onClick={e => {
                        if (e.currentTarget == e.target) setSelectedSlotPoint({ x: null, y: null })
                    }}>
                        <div className={styles.slotContainer}>
                            {
                                slots.map(row => row.map(item => <Slot select={item.select} number={item.number} checked={item.checked} point={item.point} functions={{ select }} />))
                            }
                        </div>
                        <NumberSelecter functions={{ setNumber }} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)' }} remainNums={remainNums} />
                    </div>
            }
        </div>


    )
}