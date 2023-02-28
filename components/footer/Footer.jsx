import Link from 'next/link'
import styles from "./footer.module.css"
import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { HiOutlineMailOpen } from "react-icons/hi";


const Footer = () => {
    return (
        <>
            <div >
                <div className={styles.contactshort}>
                    <div >
                        <h2>User feedbacks</h2>
                    </div>
                    <div className={styles.form} >
                        <div className='flex bg-white rounded py-3'>
                            <HiOutlineMailOpen className="text-[40px] text-gray-400" />
                            <input type="email" autoComplete='off' placeholder={`Email address`} />
                        </div>
                        <Link href="/">
                            <button className={styles.btn}>Get started</button>
                        </Link>
                    </div>
                </div>

                <footer className={styles.footercontainer} >
                    <div className={styles.footeritem}>
                        <div className={styles.footerabout}>
                            <h3>About Us</h3>
                            <p>Learn from industry-leading speakers like Romain Guy and Chet Haase who have been building Android since 1.0, Jhey Tompkins and Una Kravets from the Google Chrome team.</p>
                        </div>

                        <div className={styles.pages}>
                            <div>
                                <h3>Pages</h3>
                            </div>
                            <div className={styles.footerLlink}>
                                <ul>
                                    <li>
                                        <Link href="/about">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/team">Our Terms</Link>
                                    </li>
                                    <li>
                                        <Link href="/services">Services</Link>
                                    </li>
                                    <li>
                                        <a href="/faq">Faq</a>
                                    </li>
                                    <li>
                                        <a href="/pricing">Price &amp; Plan</a>
                                    </li>
                                    <li>
                                        <a href="/news">News</a>
                                    </li>
                                    <li>
                                        <Link href="/portfolio">Case Study</Link>
                                    </li>
                                    <li>
                                        <Link href="/contactus">Contact</Link>
                                    </li>
                                    <li >
                                        <a href="/error">404 Page</a>
                                    </li>
                                    <li >
                                        <a href="/pricing">Membership</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.services}>
                            <div>
                                <h3>Our Services</h3>
                            </div>
                            <div className={styles.footerLlink}>
                                <ul>
                                    <li>
                                        <a href="/">Softwere Solution</a>
                                    </li>
                                    <li>
                                        <a href="/">Digital Marketing</a>
                                    </li>
                                    <li>
                                        <a href="/">UI & UX Design</a>
                                    </li>
                                    <li>
                                        <a href="/">Web Development</a>
                                    </li>
                                    <li>
                                        <a href="/">24/7 Online Support</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.availability}>
                            <div>
                                <h3>Our Availability</h3>
                            </div>
                            <div className={styles.availitem}>
                                <div className={styles.avail}>
                                    <div > Mon - Fri </div>
                                    <h4> 10:00 am to 06:00 pm </h4>
                                </div>
                                <div className={styles.avail}>
                                    <div> Saturday (1st & 4th) </div>
                                    <h4> 08:00 am to 04:00 pm</h4>
                                </div>
                                <div className={styles.avail}>
                                    <h4> Emergency Service </h4>
                                    <a href="/"><h4>+91 8770783462</h4></a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.socialicon}>
                            <h3>FOllow Us</h3>
                            <div className={styles.footersocialicon}>
                                <div>
                                    <AiFillGithub className={styles.icons} />
                                </div>
                                <div>
                                    <AiFillInstagram className={styles.icons} />
                                </div>
                                <div>
                                    <AiFillLinkedin className={styles.icons} />
                                </div>
                                <div>
                                    <a href="https://www.youtube.com" target={"_blank"}>
                                        <AiFillYoutube className={styles.icons} />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div >
                        <hr style={{ margin: "0px", padding: "0px" }} />
                        <div className={styles.bottomfooter}>
                            <p>
                                @{new Date().getFullYear()} Thapatechnical. All Right reserved
                            </p>
                            <div>
                                <p>PRIVACY POLICY</p>
                                <p>TERMS & CONDITIONS</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer