import styles from "@/styles/Home.module.css";
import { BiRightArrowAlt } from "react-icons/bi";
import CountAchivement from "components/incCounter/CountAchivement";
import Services from "components/services/Services";
import About from "components/about/About";
import UserFeedback from "components/feedbackslider/UserFeedback";
import Project from "components/projects/project";
import Customerexp from "@/components/customerexp/customerexp";
import React, { useEffect, useState } from "react";
import Headcomponent from "@/components/headcomponent/Headcomponent";
import Link from "next/link";

export default function Home() {
  const [aboutdata, setAboutdata] = useState([]);

  const getData = async () => {
    const data = await fetch("http://localhost:3000/api/getabout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    if (data.status === 200) {
      setAboutdata(res.about[0]);
    } else {
      alert("server error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Headcomponent
        title="My Portfolio App"
        description="Generated by create next app"
      />

      <div className={styles.fluidcontainer}>
        <div className={`${styles.main1}`}>
          <p> We Provide Outsourced</p>
          <h1>IT Solution</h1>
          <p>
            IT producers worldwide face similar challenges around animal
            welfare, farm profitability, product and work efficiency.
          </p>
          <div className={styles.undermain}>
            <Link href="https://www.google.com" target={"_blank"}>
              <button className={`${styles.btn} flex items-center gap-3`}>
                Get Started
                <BiRightArrowAlt className={`${styles.arrow} text-2xl`} />
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.container}></div>
      </div>

      <About
        title={aboutdata.title}
        heading={aboutdata.heading}
        image={aboutdata.image}
        years={aboutdata.years}
        feedback={aboutdata.feedback}
        feedbackProvider={aboutdata.feedbackProvider}
        designation={aboutdata.designation}
        shortdescription={aboutdata.shortdescription}
        description={aboutdata.description}
        id={aboutdata._id}
      />

      <Customerexp id="customerexp" />

      <Services id="services" num={3} />

      <CountAchivement />

      <Project id="portfolio" num={3} />

      <UserFeedback />
    </>
  );
}
