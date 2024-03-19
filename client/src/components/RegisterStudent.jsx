import { useState } from 'react'
import { getFullFaceDescription, loadModels } from '../face Utils';
import ImageCapture from './ImageCapture';
import axios from 'axios'

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });
// }


function RegisterStudent() {
    console.log("RegisterStudent rendered")
    loadModels()
    const [faceDesc, setFaceDesc] = useState([])
    const [name, setName] = useState('')
    const [roll, setRoll] = useState(0)
    const [base64Image, setBase64Image] = useState('');
    const [selectedUploadOption, setSelectedUploadOption] = useState('From Disk');


    const handleSubmit = async (e) => {
        console.log(faceDesc[0].descriptor)
        e.preventDefault();
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8000/createUser',
                responseType: 'json',
                data: {
                    name: name,
                    roll: roll,
                    descriptor: faceDesc[0].descriptor
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelectUploadOption = (e) => {

        setSelectedUploadOption(e.target.value);
    };

    const handleFileUpload = async (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();
        let img;
        reader.onloadend = async () => {
            // Once the file is loaded, convert it to base64
            if (reader.result) {
                img = reader.result
                console.log(img)
                const info = await getFullFaceDescription(img)
                console.log(info)
                setFaceDesc(info)
                setBase64Image(reader.result);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }


    }


    return (
        <div className='h-screen w-screen flex flex-col items-center'>
            <h1 className='h-10 my-10 text-3xl font-bold uppercase'>Student Registration Form</h1>
            <form className=' w-96 p-8 flex flex-col border gap-2'>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name='name' className='border' value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="roll">Roll No</label>
                <input type="number" id="roll" name='roll' className='border' value={roll} onChange={(e) => setRoll(e.target.value)} />
                <label htmlFor="">Upload Image</label>
                <select name="" id="" className='border' onChange={handleSelectUploadOption}>
                    <option value="From Disk" >From Disk</option>
                    <option value="From Webcam" >From Webcam</option>
                </select>
                {selectedUploadOption === 'From Disk' ?
                    <input type="file" id="image" name='image' className='border' accept='image/x-png,image/jpeg' onChange={handleFileUpload} /> : <ImageCapture />}
                {base64Image && (
                    <div>
                        <img src={base64Image} alt="Uploaded" />
                    </div>
                )}
                <button type="submit" className='border' onClick={handleSubmit}>Register</button>
            </form>
        </div>
    )
}

export default RegisterStudent