import CountAchivement from 'components/incCounter/CountAchivement'
import Project from 'components/projects/project'
import Image from 'next/image'
const home = () => {
    return (
        <>
            <div className="imgOverLay">
                <Image src="/portfolio-bg-01.jpg" alt="my works" width="2000" height="600"></Image>
                <div className="overLay">
                    <div className="itemContent">
                        <h3>
                            Portfolio
                        </h3>
                    </div>
                </div>
            </div>
            <Project />
            {/* <CountAchivement /> */}
        </>
    )
}

export default home