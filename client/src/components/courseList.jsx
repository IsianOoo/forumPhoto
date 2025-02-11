import CourseCard from "./courseCard"




export default function CourseList() {

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
            
            <CourseCard />
        </div>
    )
}