import Services from "components/services/Services";

const services = () => {
  return (
    <>
      <div className="imgOverLay">
        <img src="/projectimages/portfolio-01.jpg" alt="my works" />
        <div className="overLay">
          <div className="itemContent">
            <h3>Services</h3>
          </div>
        </div>
      </div>
      <Services />
    </>
  );
};

export default services;