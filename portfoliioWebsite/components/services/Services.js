import Image from "next/image";
import Link from "next/link";
import React, {  useState, useEffect } from "react";
import styles from "./services.module.css";

const Services = ({num}) => {
  const [services, setServices] = useState([]);

  const getData = async () => {
    const data = await fetch("http://localhost:3000/api/allservices", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    if (data.status === 200) {
      setServices(res.services);
    } else {
      alert("server error");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.fluidcontainer}>
      <div className={styles.head1}>
        <div className={styles.sectiontitle}>
          <span>{'//'} Service</span>
          <h2>What we do here</h2>
        </div>
      </div>

      <div className={styles.container}>
        {services.slice(0, num).map((x) => {
          return (
            <div className={`${styles.serviceitem} animate-up`} key={x._id} >
              <div className={styles.itemWrapper}>
                <div className={styles.serviceImg}>
                <Image
                  src={x.image}
                  alt="icon not found" 
                  width="100"
                  height="50"
                ></Image>
                </div>
                <div className={styles.itemContent}>
                  <h3>
                    <Link href="/">{x.title}</Link>
                  </h3>
                  <p>{x.shortdescription}....</p>
                </div>
                <div className={styles.readmore}>
                  <Link className="service__btn" href={`/services/${x._id}`}>
                    {" "}
                    <span>{'//'} Read More</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
