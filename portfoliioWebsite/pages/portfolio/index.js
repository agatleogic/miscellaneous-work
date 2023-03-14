import Headsection from '@/components/headsection/Headsection';
import Project from 'components/projects/project';

const home = () => {
    return (
        <>
            <Headsection img="/portfolio-bg-01.jpg" title="Portfolios"/>

            <Project />
        </>
    )
}

export default home