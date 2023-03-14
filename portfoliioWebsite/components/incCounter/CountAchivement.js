import React from 'react'
import { useState } from 'react'
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger'
import styles from "./numberanimation.module.css"

const CountAchivement = () => {
    const [counterOn, setCounterOn] = useState(false)
    return (
        <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
            <div className={styles.counterBgArea}>
                <div>
                    <h1>
                        {counterOn && <CountUp start={0} end={30} duration={3} delay={0} />}+
                    </h1>
                    <p>Year experience in this field</p>
                </div>
                <div>
                    <h1>
                        {counterOn && <CountUp start={0} end={670} duration={3} delay={0} />}+
                    </h1>
                    <p>Worldwide good clientse</p>
                </div>
                <div>
                    <h1>
                        {counterOn && <CountUp start={0} end={1200} duration={3} delay={0} />}+
                    </h1>
                    <p>Worldwide Captured online base</p>
                </div>
                <div>
                    <h1>
                        {counterOn && <CountUp start={0} end={5} duration={3} delay={0} />}+
                    </h1>
                    <p>Masterclass Team ever made</p>
                </div>
            </div>
        </ScrollTrigger>
    )
}

export default CountAchivement;
