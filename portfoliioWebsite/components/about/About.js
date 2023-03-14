import styles from "./about.module.css";
import CountUp from "react-countup";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const About = ({
  title,
  heading,
  image,
  years,
  feedback,
  feedbackProvider,
  designation,
  shortdescription,
  description,
  id,
}) => {
  const router = useRouter();
  
  return (
    <div className={styles.container}>
      <div className={styles.aboutyear}>
        <div className={styles.aboutImg}>
          {image && (
            <Image src={image} width="500" height="400" alt="about-img"></Image>
          )}
        </div>
        <div className={styles.counterbox}>
          <h2>
            <CountUp start={0} end={years} duration={3} delay={0.1} />
          </h2>
          <span>Years Experience</span>
        </div>
      </div>

      <div className={styles.abouts}>
        <div className={styles.aboutHead}>
          <h2>{heading}</h2>
        </div>

        <div className={styles.aboutcontent}>
          <p>{shortdescription}</p>
        </div>

        <div className={styles.aboutItem}>
          <h3>{feedback}</h3>
          <div className="">
            <h4>
              {feedbackProvider}, <span>{designation}</span>
            </h4>
          </div>
        </div>

        <div className={styles.aboutbtn}>
          {!router.query.detail && (
            <Link className="it__btn-3" href={`/about/${id}`}>
              learn more
              <span>
                <i className="fa-solid fa-angle-right"></i>
              </span>
            </Link>
          )}
        </div>
      </div>
      {router.query.detail && (
        <div className="container">
          <h1 className="text-white text-3xl my-3 font-bold">About</h1>
          <p className="text-gray-300">{description}.</p>
        </div>
      )}
    </div>
  );
};

export default About;
