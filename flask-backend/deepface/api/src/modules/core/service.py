from deepface import DeepFace

# pylint: disable=broad-except


def verify(
    img1_path, img2_path, model_name, detector_backend, distance_metric, enforce_detection, align
):
    try:
        obj = DeepFace.verify(
            img1_path=img1_path,
            img2_path=img2_path,
            model_name=model_name,
            detector_backend=detector_backend,
            distance_metric=distance_metric,
            align=align,
            enforce_detection=enforce_detection,
        )
        return obj
    except Exception as err:
        return {"error": f"Exception while verifying: {str(err)}"}, 400

