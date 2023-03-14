import { useEffect, useState } from "react";
import Customerexp from "@/components/customerexp/customerexp";
import Headcomponent from "@/components/headcomponent/Headcomponent";
import Headsection from "@/components/headsection/Headsection";
import About from "components/about/About";

export default function Aboutus() {
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
        title={aboutdata.seotitle}
        description={aboutdata.seodescription}
        tags={aboutdata.seoTags}
      />
      <Headsection
        img="/projectimages/bussines-04.jpg"
        title={aboutdata.title}
      />
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
      <Customerexp />
    </>
  );
}
