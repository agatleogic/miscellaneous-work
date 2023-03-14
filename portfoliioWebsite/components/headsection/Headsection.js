import Image from "next/image";
import { useRef, useEffect } from "react";

const Headsection = ({img, title}) => {
    const elementRef = useRef(null);
  
    useEffect(() => {
      // Check if the element is in the viewport
      function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
      }
  
      // On scroll
      const handleScroll = () => {
        if (isInViewport(elementRef.current)) {
          elementRef.current.classList.add("animate");
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      // Clean up event listener on unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  return (
    <>
      <div className="imgOverLay">
        <Image
          src={img}
          alt="my works"
          width="1500"
          height="600"
        ></Image>
        <div className="overLay ">
          <div className="itemContent animate-up" ref={elementRef}>
            <h3> {title} </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Headsection;
