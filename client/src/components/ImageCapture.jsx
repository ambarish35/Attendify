import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { getFullFaceDescription } from "../face Utils/index.js";

function ImageCapture() {

    console.log("ImgCapture mounted")
    // const canvasRef = useRef(null);


    const videoConstraints = {
        width: 720,
        height: 480,
        facingMode: "user"
    };

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [fullFaceDescription, setFullFaceDescription] = useState(null);

    const capture = useCallback(async (e) => {
        e.preventDefault()
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);

        let fullFaceDescription = await getFullFaceDescription(imageSrc)

        setFullFaceDescription(fullFaceDescription)


    }, [webcamRef, setImgSrc]);

    console.log(fullFaceDescription)

    return (
        <div className="w-full m-auto flex flex-col items-center justify-center">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} mirrored screenshotQuality={0.1} />
            <button onClick={capture} className="border p-2 border-black rounded-lg my-2">Capture photo</button>
            {imgSrc && <img src={imgSrc} />}
        </div>
    );
}

export default ImageCapture;
