"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const PupilTable = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status == 'unauthenticated') {
      router.push('/auth/login');
      return null;
    }
  }, [status]);
  const [pupils, setPupils] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('https://localhost:7268/api/Pupil/GetAllPupil', {
                  method: 'GET',
                  headers: {
                      'Accept': 'application/json',
                      // 'Authorization': `Bearer ${your_access_token}`
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

      fetchData();
  }, []);
  const handleDelete = async (Id) => {
    try {
        const response = await fetch(`https://localhost:7268/api/Lesson/DeleteLesson?id=${Id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${your_access_token}`
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
    <>
     <div className="container mx-auto p-4">
      {pupils.map((pupil) => (
        <div key={pupil.pupilId} className="bg-slate-800 shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">{pupil.pupilFullName}</h2>
          <p className="mb-2">pupil Number: {pupil.pupilNumber}</p>
          <p className="mb-4">class: {pupil.class}</p>
          <div className="space-y-4">
            {pupil.exams.map((exam) => (
              <div key={exam.examId} className="bg-slate-900 p-4 rounded-lg">
                <p><span className="font-semibold">lessonName:</span> {exam.lessonName}</p>
                <p><span className="font-semibold">teacherFirstName:</span> {exam.teacherFirstName} {exam.teacherLastName}</p>
                <p><span className="font-semibold">examDate:</span> {new Date(exam.examDate).toLocaleString()}</p>
                <p><span className="font-semibold">grade:</span> {exam.grade}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default PupilTable