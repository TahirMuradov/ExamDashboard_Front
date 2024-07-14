"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const LessonTable = () => {
  const router = useRouter();
  const { data:session, status } = useSession();
  console.log(session.user?.accessToken)
  useEffect(() => {
    if (status == 'unauthenticated') {
      router.push('/auth/login');
      return null;
    }
  }, [status]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
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

      fetchData();
  }, []);
  const handleDelete = async (Id) => {
    try {
        const response = await fetch(`https://localhost:7268/api/Lesson/DeleteLesson?id=${Id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                   'Authorization': `Bearer ${session.user.accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete exam');
        }

        // Remove the deleted exam from state
        setExams(lessons.filter(lesson => lesson.id !== Id));

    } catch (error) {
        console.error('Delete error:', error);
    }
};
  return (
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th className="px-6 py-3">Lesson Name</th>
                <th className="px-6 py-3">Lesson Code</th>
                <th className="px-6 py-3">Class</th>
                <th className="px-6 py-3">Teacher Name</th>
                <th className="px-6 py-3">Exams Date</th>
                <th className="px-6 py-3">Actions</th>
            </tr>
        </thead>
        <tbody>
            {lessons.map((lesson) => (
                <tr key={lesson.id} className={`border-b dark:border-gray-700 ${lesson.id % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'}`}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {lesson.lessonName}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {lesson.lessonCode}
                    </td>
                    <td className="px-6 py-4">{lesson.class}</td>

                    <td className="px-6 py-4">{lesson.teacherName}</td>
                    <td className="px-6 py-4">
                    
                       {
                        lesson.examsDate.map((date)=>(

                          new Date(date).toLocaleDateString()+","
                        ))
                       }

                    </td>
                   
                    <td className="px-6 py-4">
                        <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline' onClick={() => handleDelete(lesson.id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}

export default LessonTable