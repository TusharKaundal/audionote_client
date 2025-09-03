import React from 'react'
import styles from './TranscribeCard.module.css'
import Button from '../../shared/ui/Button/Button'
import Input from '../../shared/ui/Input/Input'

const TranscribeCard = () => {
    return (
        <div className={styles.conatiner}>

            <div className={styles.cardContent}>
                <Input value={"This is a sample transcribed text from the audio note\n"} />

            </div>
            <div className={styles.cardAction}>
                <div className={styles.edit_delete_controls}>
                    <Button theme='secondary'>Edit</Button>
                    <Button theme='secondary'>Delete</Button>
                </div>

                <Button theme='primary'>Generate Summary</Button>
            </div>
        </div>
    )
}

export default TranscribeCard