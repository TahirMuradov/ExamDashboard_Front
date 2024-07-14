'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

const ExamForm = () => {
    const [pupils, setPupils] = useState([]);
    const [lessons, setLessons] = useState([]);
    const router = useRouter();
    const { data: session, status } = useSession();
    console.log(session.user?.accessToken)
    useEffect(() => {
      if (status == 'unauthenticated') {
        router.push('/auth/login');
        return null;
      }
    }, [status]);
    useEffect(() => {
        const getPupilAll = async () => {
            try {
                const response = await fetch('https://localhost:7268/api/Pupil/GetAllPupil', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                         'Authorization': `Bearer ${session.user.accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setPupils(data); 

            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        const getLessonAll = async () => {
            try {
                const response = await fetch('https://localhost:7268/api/Lesson/GetAllLesson', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                           'Authorization': `Bearer ${session.user.accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setLessons(data); 

            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        
        getPupilAll();
        getLessonAll();
    }, []);

    const createExam = async () => {
        try {
          
            const formData = new FormData(document.getElementById('examForm'));
            const examData = {
                lessonId: formData.get('lesson'),
                pupilId: formData.get('pupil'),
                grade: formData.get('grade'),
                examDate: formData.get('date')
            };

            const response = await fetch('https://localhost:7268/api/Exam/AddExam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${session.user.accessToken}`
                },
                body: JSON.stringify(examData)
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
                    document.getElementById('examForm').reset();
                }
                            });

        } catch (error) {
            swal({
                title: 'Yaradila bilmədi!',
                text: error.message,
                icon: 'error',
            }).then((action)=>{
if  (action){
    document.getElementById('examForm').reset();
}
            });
        }
    };

    return (
        <form id='examForm' className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
                        Lesson
                    </label>
                    <div className="relative">
                        <select name='lesson' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            {lessons.map((lesson) => (
                                <option key={lesson.id} value={lesson.id}>{lesson.lessonName}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-state">
                        Pupil
                    </label>
                    <div className="relative">
                        <select name='pupil' className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            {pupils.map((pupil) => (
                                <option key={pupil.pupilId} value={pupil.pupilId}>{pupil.pupilFullName}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Grade
                    </label>
                    <input name='grade' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" min="0" max="10" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Date
                    </label>
                    <input name='date' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="datetime-local" />
                </div>
            </div>
            <button type='button' onClick={createExam} className='bg-green-400 p-1 rounded'>Save</button>
        </form>
    );
}

export default ExamForm;
