import { useEffect, useState } from "react";
import Customerexp from "@/components/customerexp/customerexp";
import Headcomponent from "@/components/headcomponent/Headcomponent";
import Headsection from "@/components/headsection/Headsection";
import About from "components/about/About";
import { useRouter } from "next/router";

export default function AboutDetail() {
  const [aboutdata, setAboutdata] = useState([]);
  const router = useRouter();

  const getData = async () => {
    const data = await fetch(
      `http://localhost:3000/api/getabout/${router.query.detail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data.json();
    if (data.status === 200) {
      setAboutdata(res.about);
    } else {
      alert("server error");
    }
  };

  useEffect(() => {
    getData();
  }, [router.query.detail]);

  return (
    <>
      {router.query.detail ? (
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
          />
        </>
      ) : (
        <h1 className="text-center text-5xl my-5">Loading....</h1>
      )}
      <Customerexp />
    </>
  );
}
