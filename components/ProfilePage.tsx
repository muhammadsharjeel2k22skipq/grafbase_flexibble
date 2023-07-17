import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button,ProjectCard } from '@/components';
import { ProjectInterface, UserProfile } from '@/common.types';


const ProfilePage = ({ user }:{ user: UserProfile }) => { 

  return (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
        {/* Img and text */}
        <section className='flexBetween max-lg:flex-col gap-10 w-full'>
            <div className='flex flex-col items-start w-full'>
                <Image src={user?.avatarUrl} width={100} height={100} className="rounded-full" alt="user image" />
                <p className="text-4xl font-bold mt-10">{user?.name}</p>
                <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">I’m Software Engineer at SkipQ 👋</p>

                <div className='flex mt-8 gap-5 w-full flex-wrap'>
                    <Button title='Follow' leftIcon={'/plus-round.svg'} bgColor='bg-light-white-400 !w-max' 
                      textColor='text-black-100'
                    />

                    <a href={`mailto:${user?.email}`}>
                        <Button title='Hire Me' leftIcon={'/email.svg'} />
                    </a>
                </div>
            </div>

            {user?.projects?.edges.length > 0 ? (
                    <Image src={user?.projects?.edges[0]?.node?.image} alt='ProjImg' width={739} height={554} 
                      className='rounded-xl object-contain'
                    />
                ): (
                    <Image src={'/profile-post.png'} alt='ProjImg' width={739} height={554} 
                      className='rounded-xl'
                    />
            )}
        </section>

        <section className='flexStart flex-col lg:mt-28 mt-16 w-full'>
          <p className='w-full text-left text-lg font-semibold'>Recent Work</p>

          <div className='profile_projects'>
            {user?.projects?.edges?.map(({node}:{node:ProjectInterface}) => (
              <ProjectCard key={node?.id} id={node?.id} image={node?.image} title={node?.title}
                name={user.name} avatarUrl={user.avatarUrl} userId={user.id} 
              />
            ))}
          </div>
        </section>

    </section>
  )
}

export default ProfilePage;

