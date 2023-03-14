import React, { useEffect, useState } from 'react'
import { BiUpArrowAlt } from 'react-icons/bi'
import styles from "./gototop.module.css"

const GoToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    const goTopbutton = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
    const listenToScroll = () => {
        let heightToHidden = 250;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

        if (winScroll > heightToHidden) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll)
        return ()=>window.removeEventListener("scroll", listenToScroll)
    }, [])

    return (
        <>
            {
                isVisible && (
                    <div className={styles.section}>
                        <div className={styles.topbtn} onClick={goTopbutton}>
                            <BiUpArrowAlt className={`${styles.icon} animate-bounce`} />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default GoToTop