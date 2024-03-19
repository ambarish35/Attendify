import * as faceapi from "face-api.js";


export const loadModels = async () => {

    const MODEL_URL = './models';
    try {
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
        await faceapi.loadFaceRecognitionModel(MODEL_URL)
        await faceapi.loadFaceLandmarkModel(MODEL_URL)
    } catch (e) {
        console.log(e)
    }

}

export const getFullFaceDescription = async (blob) => {

    let img = await faceapi.fetchImage(blob);

    const fullFaceDescription = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();
    return fullFaceDescription
}

export const createMatcher = async (faceProfiles) => {

    let labeledFaceDescriptors = faceProfiles.map(
        profile => {
            return new faceapi.LabeledFaceDescriptors(
                `${profile.name} - ${profile.roll}`,
                new Array(new Float32Array(Object.values(profile.descriptor[0]).map(Number)))

            )

        }
    )
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.45);
    return faceMatcher
}

