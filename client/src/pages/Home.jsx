
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='w-full'>
            <h1 className='text-4xl font-bold my-10 mx-auto w-fit'>Welcome to Face Recognition Based Attendance System</h1>
            <div className='m-auto w-fit'>
                <Link to={'/registerStudent'}><button className='m-4 p-6 border rounded'>Register </button></Link>
                <Link to={'/attendance'}><button className='m-4 p-6 border rounded'>Take Attendance </button></Link>
            </div>
        </div>
    )
}

export default Home