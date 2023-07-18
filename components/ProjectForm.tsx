'use client';
import React,{ ChangeEvent,FormEvent,useState } from 'react';
import { SessionInterface } from '@/common.types';
import Image from 'next/image';
import { Button, CustomMenu, FormFiled } from '@/components';
import { categoryFilters } from '@/constants';
import { createProject, fetchToken, updateProject } from '@/lib/actions';
import { useRouter } from 'next/navigation';


type Props = {
  type: string;
  session: SessionInterface,
  projectId?: string
}

const ProjectForm = ({ type,session,projectId }:Props) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    image: '',
    description: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: ''
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { token } = await fetchToken();

    try {
      if(type === 'create') {
        //Create Project
        await createProject(form, session.user.id, token);
        router.push('/');
      }
      if(type === 'edit') {
        await updateProject(form,projectId as string,token);
        router.push('/');
      }
    }
    catch(error) {
      console.log('Error in creating project from ProjectFom.tsx',error);
    }
    finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files?.[0];

    if(!file) return;
    if(!file.type.includes('image')) return alert('Please upload a image file');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange('image',result);
    };

  };

  const handleStateChange = (title:string, value:string) => {
    setForm((prevState) => ({
      ...prevState,
      [title]: value
    }));
  };


  return (
    <form onSubmit={handleFormSubmit} className='flexStart form'>
      <div className='flexStart form_image-container'>
        <label htmlFor='poster' className='flexCenter form_image-label'>
          {!form?.image && 'Choose a poster for your project'}
        </label>
        <input id='image' type='file' accept='image/*' required={type === 'create'} className='form_image-input'
          onChange={handleChangeImage}
        />

        {form?.image && (
          <Image src={form?.image} fill className='sm:p-10 object-contain z-20' alt='Project poster' />
        )}
      </div>

      <FormFiled
        title='Title'
        state = {form?.title}
        placeholder='Flexibble'
        setState = {(value:any) => handleStateChange('title',value)}
      />
      <FormFiled
        title='Description'
        state = {form?.description}
        placeholder='Showcase and discover remarkable developer projects.'
        setState = {(value:any) => handleStateChange('description',value)}
      />
      <FormFiled
        type='url'
        title='Website URL'
        state = {form?.liveSiteUrl}
        placeholder='https://sharjeel-protfolio.netlify.app/'
        setState = {(value:any) => handleStateChange('liveSiteUrl',value)}
      />
      <FormFiled
        type='url'
        title='GitHub URL'
        state = {form?.githubUrl}
        placeholder='https://github.com/muhammadsharjeel2k22skipq'
        setState = {(value:any) => handleStateChange('githubUrl',value)}
      />
      
      <CustomMenu
        title="Category"
        state={form?.category}
        filters={categoryFilters} 
        setState={(value:any) => handleStateChange('category',value)}

      />

      <div className='flexStart w-full'>
        <Button
          title={isSubmitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>

    </form>
  )
}

export default ProjectForm;

