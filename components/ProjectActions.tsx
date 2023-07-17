'use client';
import React,{ use, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { fetchToken,deleteProject } from '@/lib/actions';

const ProjectActions = ({ projectId }:{ projectId: string }) => {

  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    const { token } = await fetchToken();

    try{
      await deleteProject(projectId,token);
      router.push('/');
    }
    catch(error){
      console.log('Error in deleting project',error);
    }
    finally{
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link href={`/edit-project/${projectId}`} className="flexCenter edit-action_btn">
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>

      <button type='button' disabled={isDeleting} 
        className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "bg-primary-purple"}`} 
        onClick={handleDeleteProject}
       >
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  )
}

export default ProjectActions;

