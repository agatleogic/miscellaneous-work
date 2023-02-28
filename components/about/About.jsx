import styles from "./about.module.css";
import CountUp from 'react-countup'


const About = () => {
    return (
            <div className={styles.container}>

                <div className={styles.aboutyear}>
                    <div className={styles.aboutImg}>
                        <img src="/about-01.jpg" alt="about-img" />
                    </div>
                    <div className={styles.counterbox}>
                        <h2 >
                            <CountUp start={0} end={30} duration={3} delay={0.1} />
                        </h2>
                        <span>Year Experience</span>
                    </div>
                </div>

                <div className={styles.abouts}>
                    <div className={styles.aboutHead}>
                        <span> // About Us</span>
                        <h2>Best in classy product near from you.</h2>
                    </div>

                    <div className={styles.aboutcontent}>
                        <p>From finance, retail, and travel, to social media, cybersecurity, adtech, and more, market leaders are leveraging web data to maintain their advantage. Discover how it can work for you.</p>
                    </div>

                    <div className={styles.aboutItem}>
                        <h3>Highest quality data, #01 network uptime, fastest output. Unlimited scale and customizing possibilities.</h3>
                        <div className="">
                            <h4>Miranda Helson, <span>Head Of Idea</span>
                            </h4>
                        </div>
                    </div>

                    <div className={styles.aboutbtn}>
                        <a className="it__btn-3" href="/about">learn more<span>
                            <i className="fa-solid fa-angle-right">
                            </i>
                        </span>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default About;