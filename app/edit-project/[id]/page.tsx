import React from 'react';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/session';
import { getProjectDetails } from '@/lib/actions';
import { Modal,ProjectForm } from '@/components';
import { ProjectInterface } from '@/common.types';

const EditProject = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const session = await getCurrentUser();
  if(!session?.user) redirect('/');

  const result = await getProjectDetails(id) as { project: ProjectInterface };

  if(!result?.project) {
    return (
      <p className='no-result-text'>Failed to fetch project info</p>
    )
  }

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type='edit' session={session} projectId={id} />
    </Modal>
  )
}

export default EditProject;

