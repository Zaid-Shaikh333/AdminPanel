import { Spinner } from './Spinner';
import { GET_PROJECTS } from '../queries/projectQueries';
import { useQuery } from '@apollo/client';
import { ProjectCard } from '../pages/ProjectCard'

export const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    if (loading) return <Spinner />
    if (error) return <p>Couldn't fetch Projects</p>

    return (
        <>
            {data.projects.length > 0 ? (
                <div className="project-card">
                    {data.projects.map((project) => (
                        <ProjectCard key={project.id} project={project}/>
                    ))}
                </div>
            ) :
            (
                <>
                    <p>No Projects</p>
                </>
            )}
        </>
    )
}