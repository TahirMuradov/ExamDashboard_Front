'use client'
import React, { useEffect, useState } from 'react';

const ExamTable = () => {
    const [exams, setExams] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7268/api/Exam/GetAllExam', {
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
                setExams(data); 

            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (examId) => {
        try {
            const response = await fetch(`https://localhost:7268/api/Exam/DeleteExam?id=${examId}`, {
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
            setExams(exams.filter(exam => exam.examId !== examId));

        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
      <> 

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th className="px-6 py-3">Lesson Name</th>
                <th className="px-6 py-3">Teacher Name</th>
                <th className="px-6 py-3">Exam Date</th>
                <th className="px-6 py-3">Class</th>
                <th className="px-6 py-3">Actions</th>
            </tr>
        </thead>
        <tbody>
            {exams.map((exam) => (
                <tr key={exam.examId} className={`border-b dark:border-gray-700 ${exam.examId % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'}`}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {exam.lessonName}
                    </td>
                    <td className="px-6 py-4">{`${exam.teacherFirstName} ${exam.teacherLastName}`}</td>
                    <td className="px-6 py-4">{new Date(exam.examDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{exam.class}</td>
                    <td className="px-6 py-4">
                        <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline' onClick={() => handleDelete(exam.examId)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

      </>
    );
};

export default ExamTable;
