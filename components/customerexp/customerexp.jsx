const Customerexp = () => {
  return (
    <>
      <section className="text-gray-200 body-font">
        <div className="container mx-auto flex px-5 py-16 lg:flex-row flex-col items-center gap-4">
          <div className="lg:flex-grow lg:w-1/2 md:w-full flex flex-col lg:gap-10 gap-5 md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <div className="flex flex-col gap-5 m-0 ">
              <p className="mb-8 leading-relaxed text-green-500">
                // Some Facts
              </p>
              <h1 className="title-font sm:text-4xl lg:text-5xl mb-4 text-gray-100">
                The best customer experience
              </h1>
            </div>

            <div className="flex w-full md:justify-start justify-center items-end">
              <div className="relative mr-4 w-full">
                <div className="flex justify-between mx-3">
                  <h2 className="text-2xl">Design & Servicing</h2>
                  <span className="text-xl">68%</span>
                </div>
                <input
                  type="range"
                  max="100"
                  // min="10"
                  value="68"
                  // className="form-range lg:w-[500px] w-full"
                  id="customRange1"
                  className="w-full"
                  readOnly
                />
                <hr />
              </div>
            </div>

            <div className="flex w-full md:justify-start justify-center items-end">
              <div className="relative mr-4 w-full">
                <div className="flex justify-between mx-3">
                  <h2 className="text-2xl">Support & Productivity</h2>
                  <span className="text-xl">80%</span>
                </div>
                <input
                  type="range"
                  max="100"
                  // min="10"
                  value="80"
                  // className="form-range lg:w-[500px] w-full"
                  id="customRange1"
                  className="w-full"
                  readOnly
                />
                <hr />
              </div>
            </div>

            <div className="flex w-full md:justify-start justify-center items-end">
              <div className="relative mr-4 w-full">
                <div className="flex justify-between mx-3">
                  <h2 className="text-2xl">Troubleshooting</h2>
                  <span className="text-xl">74%</span>
                </div>
                <input
                  type="range"
                  max="100"
                  // min="10"
                  value="75"
                  // className="form-range lg:w-[500px] w-full"
                  id="customRange1"
                  className="w-full"
                  readOnly
                />
                <hr />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center relative overflow-hidden mt-6 rounded">
            <img
              className="rounded lg:max-w-2xl lg:w-full md:w-full w-5/6 hover:scale-110 transition duration-300 ease-in-out"
              alt="hero"
              src="/images/skills-img.png"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Customerexp;
