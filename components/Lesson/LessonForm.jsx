"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const LessonForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status == 'unauthenticated') {
      router.push('/auth/login');
      return null;
    }
  }, [status]);
  const createLesson = async () => {
    try {
      
        const formData = new FormData(document.getElementById('lessonForm'));
        const lessonData = {
          lessonCode: formData.get('lessonCode'),
          lessonName: formData.get('lessonName'),
          class: formData.get('class'),
          teacherLastName: formData.get('teacherLastName'),
          teacherFirstName: formData.get('teacherFirstName')
        };

        const response = await fetch('https://localhost:7268/api/Lesson/AddLesson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${your_access_token}`
            },
            body: JSON.stringify(lessonData)
        });

   

        if (!response.ok) {
            throw new Error(result.message || 'Failed to create exam');
        }

        swal({
            title: 'Yaradıldı!',
            text: '',
            icon: 'success',
        }).then((action)=>{
            if  (action){
                document.getElementById('lessonForm').reset();
            }
                        });

    } catch (error) {
        swal({
            title: 'Yaradila bilmədi!',
            text: error.message,
            icon: 'error',
        }).then((action)=>{
if  (action){
document.getElementById('lessonForm').reset();
}
        });
    }
};
  return (
    <form id='lessonForm' className="w-full max-w-lg">
    <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
            Lesson Code
            </label>
            <div className="relative">
            <input name='lessonCode' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
            Lesson Name
            </label>
            <div className="relative">
            <input name='lessonName' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </div>
    </div>

    <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
            Class
            </label>
            <input name='class' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" min="0" max="12" />
        </div>
        <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
            Teacher Last Name
            </label>
            <input name='teacherLastName' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
        </div>
        <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
            Teacher First Name
            </label>
            <input name='teacherFirstName' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
        </div>
    </div>
    <button type='button' onClick={createLesson} className='bg-green-400 p-1 rounded'>Save</button>
</form>
  )
}

export default LessonForm