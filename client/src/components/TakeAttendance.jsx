
import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { drawFaceAndRect } from "../face Utils/drawFaceAndRect.js"; //drawFaceAndRect
import { loadModels, getFullFaceDescription, createMatcher } from "../face Utils/index.js";
import axios from 'axios'

function TakeAttendance() {

    const canvasRef = useRef(null);
    const videoConstraints = {
        width: 720,
        height: 480,
        facingMode: "user"
    };

    const webcamRef = useRef(null);
    const [attendance, setAttendance] = useState([]);
    const [faceDB, setFaceDB] = useState(null)
    // const [imgSrc, setImgSrc] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [fullFaceDescription, setFullFaceDescription] = useState(null);

    useEffect(() => {

        loadModels()
        async function matcher() {
            const res = await axios({
                method: "get",
                url: "http://localhost:8000/getAllUsers",
                responseType: "json",
            })
            //check there should be at least one matcher
            setParticipants(res.data)
            const profileList = await createMatcher(res.data);
            setFaceDB(profileList)
        }
        matcher();

    }, []);

    useEffect(() => {
        function capture() {
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;


            // 4. TODO - Make Detections
            // e.g. const obj = await net.detect(video);

            // Draw mesh
            getFullFaceDescription(webcamRef.current.getScreenshot())
                .then((data) => {
                    setFullFaceDescription(data);
                })
                .catch((err) => {
                    console.log(err)
                });

            const ctx = canvasRef.current.getContext("2d");

            console.log(ctx)
            drawFaceAndRect(fullFaceDescription, faceDB, participants, ctx);

            if (!!fullFaceDescription) {
                console.log("Now got full desc");
                fullFaceDescription.map((desc) => {
                    const bestMatch = faceDB.findBestMatch(desc.descriptor);
                    console.log(bestMatch);
                });
            }

        }

        let interval = setInterval(() => {
            capture();
        }, 700);

        return () => clearInterval(interval);
    });

    // const capture = useCallback(async (e) => {
    //     e.preventDefault()
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     setImgSrc(imageSrc);

    //     let fullFaceDescription = await getFullFaceDescription(imageSrc)

    //     setFullFaceDescription(fullFaceDescription)


    // }, [webcamRef, setImgSrc]);

    // console.log(fullFaceDescription)

    return (
        <>
            <div className="w-full m-auto flex flex-col items-center justify-center">
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} mirrored screenshotQuality={0.1} />
                {/* <button className="border p-2 border-black rounded-lg my-2">Capture photo</button>
            {imgSrc && <img src={imgSrc} />} */}
            </div>
            <canvas ref={canvasRef} className='absolute top-0 left-1/4 ml-[14px]'></canvas>
            <textarea name="" id="" cols="30" rows="10" className='border left-1/4' value={attendance}></textarea>
        </>
    );
}

export default TakeAttendance