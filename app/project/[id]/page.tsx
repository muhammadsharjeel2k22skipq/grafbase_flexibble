import React from 'react';
import { getCurrentUser } from '@/lib/session';
import { getProjectDetails } from '@/lib/actions';
import { ProjectInterface } from '@/common.types';
import { Modal, ProjectActions, RelatedProjects } from '@/components';
import Image from 'next/image';
import Link from 'next/link';


const Project = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const session = await getCurrentUser();
    const result = await getProjectDetails(id) as { project?: ProjectInterface };
    const projectDetails = result?.project;

    if(!result.project) {
        return (
            <p>Failed to fetch project details</p>
        )
    }


  return (
    <Modal>
        <section className='flex flex-col gap-y-8 max-w-4xl w-full'>
        
          <div className='flex gap-4 flex-1 items-start justify-start'>
            {projectDetails?.createdBy?.avatarUrl && (
              <Link href={`/profile/${projectDetails?.createdBy?.id}`}>
                <Image src={projectDetails?.createdBy?.avatarUrl} width={50} height={50} alt='userImg' className='rounded-full' />
              </Link>
            )}

            <div>
              <p className='self-start text-lg font-semibold'>{projectDetails?.title}</p>
              <div className='user-info'>
                <Link href={`/profile/${projectDetails?.createdBy?.id}`}>
                  {projectDetails?.createdBy?.name}
                </Link>
                <Image src={'/dot.svg'} width={4} height={4} alt='dot' />
                <Link href={`/?category=${projectDetails?.category}`} className='text-primary-purple font-semibold'>
                  {projectDetails?.category}
                </Link>
              </div>
            </div>
          </div>
          
          {session?.user?.email === projectDetails?.createdBy?.email && (
            <div className='flex justify-end items-center gap-2'>
              <ProjectActions projectId={projectDetails?.id} />
            </div>
          )}
        </section>

        <section className='mt-14'>
          <Image src={`${projectDetails?.image}`} className="object-cover rounded-2xl" width={1064} height={798}
            alt="poster"
          />
        </section>

        <section className='flex flex-col mt-20'>
          <p className='max-w-5xl text-xl font-normal'>{projectDetails?.description}</p>

          <div className='flex items-center justify-center gap-5 mt-5'>
            <Link href={projectDetails?.githubUrl as string} target='_blank' rel='noreferrer' 
              className='flexCenter gap-2 tex-sm font-medium text-primary-purple'
            >
              🖥 <span className="underline">Github</span> 
            </Link>

            <Image src={'/dot.svg'} width={4} height={4} alt='dot' />

            <Link href={projectDetails?.liveSiteUrl as string} target='_blank' rel='noreferrer' 
              className='flexCenter gap-2 tex-sm font-medium text-primary-purple'
            >
              🚀 <span className="underline">Live Site</span> 
            </Link>
          </div>
        </section>

        <section className='mt-28 flexCenter w-full gap-8'>
          <span  className='w-full h-0.5 bg-light-white-200' />
          <Link href={`/profile/${projectDetails?.createdBy?.id}`} className="min-w-[82px] h-[82px]">
            <Image src={projectDetails?.createdBy?.avatarUrl as string} width={82} height={82} alt='userImg' className='rounded-full' />
          </Link>
          <span  className='w-full h-0.5 bg-light-white-200' />
        </section>

        <RelatedProjects userId={projectDetails?.createdBy?.id as string} projectId={projectDetails?.id as string} />
    </Modal>
  )
}

export default Project;

