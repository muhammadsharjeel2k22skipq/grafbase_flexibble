import React from 'react';
import { getUserProjects } from '@/lib/actions';
import { UserProfile } from '@/common.types';
import { ProfilePage } from '@/components';


const UserProfileInfo = async ({ params }:{ params: { id: string } }) => {
  const { id } = params;
  const result = await getUserProjects(id,100) as { user: UserProfile };

  if(!result?.user) {
    return (
      <p className='no-result-text'>Failed to fetch user info</p>
    )
  }

  return (
    <div>
      <ProfilePage user={result?.user} />
    </div>
  )
}

export default UserProfileInfo;

