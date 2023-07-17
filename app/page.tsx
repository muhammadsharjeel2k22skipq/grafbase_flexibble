import { ProjectInterface } from "@/common.types";
import { Categories, LoadMore, ProjectCard } from "@/components";
import { fetchAllProjects } from "@/lib/actions"; 

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[],
    pageInfo: {
      hasPreviousPage: boolean,
      hasNextPage: boolean,
      startCursor: string,
      endCursor: string
    },
  }
}



export default async function Home({ searchParams }:{ searchParams: { category?:string,endcursor?:string } }) { 

  const { category,endcursor } = searchParams;

  const data = await fetchAllProjects(category,endcursor) as ProjectSearch; 
  const projectsToDisplay = data?.projectSearch?.edges || []; 

  if(projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">No project found,go create some first.</p>
      </section>
    )
  }

  return (
    <div className="flex-start flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay?.map(({ node }:{ node: ProjectInterface }) => (
          <ProjectCard key={node?.id} id={node?.id} title={node?.title} image={node?.image}
            name={node?.createdBy?.name} userId={node?.createdBy?.id} avatarUrl={node?.createdBy?.avatarUrl}
          />
        ))}
      </section>

      <LoadMore
        startCursor={data?.projectSearch?.pageInfo?.startCursor}
        endCursor={data?.projectSearch?.pageInfo?.endCursor}
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage}
        hasNextPage={data?.projectSearch?.pageInfo?.hasNextPage} 
      /> 
    </div>
  )
}

