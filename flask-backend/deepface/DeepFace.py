# common dependencies
import os
import warnings
import logging
from typing import Any, Dict, List, Tuple, Union, Optional

# this has to be set before importing tensorflow
os.environ["TF_USE_LEGACY_KERAS"] = "1"

# pylint: disable=wrong-import-position

# 3rd party dependencies
import numpy as np
import pandas as pd
import tensorflow as tf

# package dependencies
from deepface.commons import package_utils, folder_utils
from deepface.commons.logger import Logger
from deepface.modules import (
    modeling,
    verification
)
from deepface import __version__

logger = Logger(module="DeepFace")

# -----------------------------------
# configurations for dependencies

# users should install tf_keras package if they are using tf 2.16 or later versions
package_utils.validate_for_keras3()

warnings.filterwarnings("ignore")
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
tf_version = package_utils.get_tf_major_version()
if tf_version == 2:
    tf.get_logger().setLevel(logging.ERROR)
# -----------------------------------

# create required folders if necessary to store model weights
folder_utils.initialize_folder()


def build_model(model_name: str) -> Any:

    return modeling.build_model(model_name=model_name)


def verify(
    img1_path: Union[str, np.ndarray, List[float]],
    img2_path: Union[str, np.ndarray, List[float]],
    model_name: str = "VGG-Face",
    detector_backend: str = "opencv",
    distance_metric: str = "cosine",
    enforce_detection: bool = True,
    align: bool = True,
    expand_percentage: int = 0,
    normalization: str = "base",
    silent: bool = False,
) -> Dict[str, Any]:

    return verification.verify(
        img1_path=img1_path,
        img2_path=img2_path,
        model_name=model_name,
        detector_backend=detector_backend,
        distance_metric=distance_metric,
        enforce_detection=enforce_detection,
        align=align,
        expand_percentage=expand_percentage,
        normalization=normalization,
        silent=silent,
    )
