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

type AllProjectsSearch = {
  projectCollection: {
    edges: { node: ProjectInterface }[],
    pageInfo: {
      hasPreviousPage: boolean,
      hasNextPage: boolean,
      startCursor: string,
      endCursor: string
    },
  }
}

type SearchProps = {
  category?: string;
  endcursor?: string;
}

type Props = {
  searchParams: SearchProps
}


export default async function Home({ searchParams: { category, endcursor } }: Props) { 
  let data:any;
  let projectsToDisplay:any = [];

  if(!category) {
    data = await fetchAllProjects(category,endcursor) as AllProjectsSearch;
    projectsToDisplay = data?.projectCollection?.edges || []; console.log(data,'data-sharjeel')
  }
  else {
    data = await fetchAllProjects(category,endcursor) as ProjectSearch;
    projectsToDisplay = data?.projectSearch?.edges || []; console.log(data,'data-sharjeel')
  }


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
        startCursor={!category ? data?.projectCollection?.pageInfo?.startCursor : data?.projectSearch?.pageInfo?.startCursor}
        endCursor={!category ? data?.projectCollection?.pageInfo?.endCursor : data?.projectSearch?.pageInfo?.endCursor}
        hasPreviousPage={!category ? data?.projectCollection?.pageInfo?.hasPreviousPage : data?.projectSearch?.pageInfo?.hasPreviousPage}
        hasNextPage={!category ? data?.projectCollection?.pageInfo?.hasNextPage : data?.projectSearch?.pageInfo?.hasNextPage} 
      /> 
    </div>
  )
}


