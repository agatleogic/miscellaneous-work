import { RiDoubleQuotesR, RiDoubleQuotesL } from "react-icons/ri";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./slider.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { useEffect } from "react";
import { useState } from "react";

export default function UserFeedback() {
  const [screen, setScreen] = useState(0);

  const listenToResize = () => {
    setScreen(window.screen.width);
  };

  useEffect(() => {
    window.addEventListener("resize", listenToResize);
    console.log(screen)
    return () => window.removeEventListener("resize", listenToResize);
  }, [listenToResize]);

  const fidbacks = [
    { name: "raman nagar", image: "/images/image-01.jpg" },
    { name: "lakhan nagar", image: "/images/image-02.jpg" },
    { name: "sandeep nagar", image: "/images/image-03.jpg" },
    { name: "shivam nagar", image: "/images/image-04.jpg" },
    { name: "hariom nagar", image: "/images/image-05.jpg" },
    { name: "subash nagar", image: "/images/image-06.jpg" },
    { name: "ankit nagar", image: "/images/image-07.jpg" },
    { name: "somesh nagar", image: "/images/image-08.jpg" },
    { name: "hritik nagar", image: "/images/image-09.jpg" },
  ];

  return (
    <>
      <section className={`text-gray-600 body-font ${styles.fluidcontainer}`}>
        <div className="container px-5 py-10 mx-auto max-[600px]:px-1">
          <div className={`${styles.sectiontitle} my-12 text-center`}>
            <span>// Testimonials //</span>
            <h1 className="text-5xl font-bold title-font text-gray-900 ">
              User feedbacks
            </h1>
          </div>
          <Swiper
            spaceBetween={30}
            slidesPerView={
              screen > 1000 ? 3 : (screen > 700 || screen < 1000) ? 2 : 1
            }
            slidesPerGroup={
              screen > 1000 ? 3 : (screen > 700 || screen < 1000) ? 2 : 0
            }
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            // pagination={{
            //   clickable: true,
            // }}
            // navigation={true}
            // modules={[Autoplay, Pagination, Navigation]}
            modules={[Autoplay]}
            className="mySwiper flex flex-wrap my-4 mx-3 max-[600px]:mx-1"
          >
            {fidbacks.map((user, i) => {
              return (
                <SwiperSlide key={i} className="p-4 md:w-1/2 max-[768px]:w-[100vw]">
                  <div className=" bg-gray-100 p-8 rounded max-[700px]:p-1">
                    <p className="relative text-center p-5 leading-relaxed mb-6 max-[500px]:px-2">
                      <RiDoubleQuotesL className="absolute top-4 left-0 block w-5 h-5 text-gray-400" />{" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consectetur atque odit deserunt iusto, aliquid praesentium
                      veniam officia sunt velit.
                      <RiDoubleQuotesR className="absolute bottom-5 right-0 block w-5 h-5 text-gray-400" />
                    </p>
                    <div className="inline-flex items-center">
                      <img
                        src={user.image}
                        alt="img no available"
                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                      />
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-gray-900">
                          {user.name}
                        </span>
                        <span className="text-gray-500 text-sm">DESIGNER</span>
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </>
  );
}
