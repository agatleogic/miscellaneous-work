import styles from './project.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Project = ({num}) => {
    const [portfolio, setPortfolio] = useState([])

    const getData = async () => {
        const data = await fetch("http://localhost:3000/api/allportfolios", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await data.json()
        if (data.status === 200) {

            setPortfolio(res.portfolio)
        } else {
            alert("server error")
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className={styles.fluidcontainer}>

            <div className={styles.head1}>
                <div className={styles.sectiontitle}>
                    <span>// Portfolio</span>
                    <h2>Case studies</h2>
                </div>
            </div>

            <div className={styles.container}>

                <div className={`${styles.main} ${styles.portfolio}`}>
                    {
                        portfolio.slice(0, num).map((x) => {
                            return (
                                <div className={styles.imgOverLay} key={x._id}>
                                    <img src={x.image} className='w-[30rem]' alt="my works" />
                                    <div className={styles.overLay}>
                                        <div className={styles.itemContent}>
                                            <h3>
                                                <Link href={`/portfolio/${x._id}`}>{x.title}</Link>
                                            </h3>
                                            {/* <p>{x.description}....</p> */}
                                            <p>{x.shortdescription}....</p>
                                        </div>
                                        <div className={styles.readmore}>
                                            <Link className="service__btn" href={`/portfolio/${x._id}`}>
                                                <span>// Read More</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}



export default Project