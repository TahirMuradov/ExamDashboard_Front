"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const PupilForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  const createPupil = async () => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }

    try {
      const formData = new FormData(document.getElementById('pupilForm'));
      const pupilData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        pupilNumber: formData.get('pupilNumber'),
        class: formData.get('class'),
      };

      const response = await fetch('https://localhost:7268/api/Lesson/AddLesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`
        },
        body: JSON.stringify(pupilData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create pupil');
      }

      swal({
        title: 'Yaradıldı!',
        text: '',
        icon: 'success',
      }).then((action) => {
        if (action) {
          document.getElementById('pupilForm').reset();
        }
      });

    } catch (error) {
      swal({
        title: 'Yaradila bilmədi!',
        text: error.message,
        icon: 'error',
      }).then((action) => {
        if (action) {
          document.getElementById('pupilForm').reset();
        }
      });
    }
  };

  return (
    <form id='pupilForm' className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
            First Name
          </label>
          <div className="relative">
            <input name='firstName' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
            Last Name
          </label>
          <div className="relative">
            <input name='lastName' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-pupil-number">
            Pupil Number
          </label>
          <input name='pupilNumber' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-pupil-number" type="number" />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-class">
            Class
          </label>
          <input name='class' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-class" type="number" min="1" max="11" />
        </div>
      </div>
      <button type='button' onClick={createPupil} className='bg-green-400 p-1 rounded'>Save</button>
    </form>
  );
};

export default PupilForm;
