import {useState, useEffect, useContext} from 'react'
import Webcam from 'react-webcam';
import imageContext from '../context/images/imageContext';
import './findyourphotos.css';
import LoadingBar from 'react-top-loading-bar'

const FindYourPhotos = () => {

  const context = useContext(imageContext);
  const {getTitledImages, images} = context;

  const [yourImages, setYourImages] = useState([]);
  const [fetched, setFetched] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fetching, setFetching] = useState(false)

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const authVal = urlParams.get('auth');
    const eventVal = urlParams.get('event');
      
    getTitledImages(authVal, eventVal);
    
  },[]);

  const matchImg = async (refImage, checkImage)=>{
    const url = "http://127.0.0.1:5000/verify";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        img1_path: refImage,
        img2_path: checkImage,
        model_name: "VGG-Face",
        detector_backend: "mtcnn",
        distance_metric: "euclidean"
      })
    });
    const json = await response.json();
    if(json.verify==="True" || json.verify==="true" || json.verify===true){
      setYourImages((yourImages)=>[...yourImages,checkImage])
      return "yes"
    }
    return null
  }  

  const apiCall = async (refImage, image1, image2)=>{
    if(image2!==null){
      return await ( matchImg(refImage, image1),
       matchImg(refImage, image2))
       
    }
    else{
      return await matchImg(refImage, image1);
    }
  }

  const showImages = async (refImage)=>{
    setProgress(10);
    let prog = 100/images.length;
    setFetching(true);
    console.log(images);
    for (let i = 0; i < images.length; i+=2) {
      const image1 = images[i];
      const image2 = images[i + 1];
      let temp;
      if (image2 !== undefined) {
        temp = await apiCall(refImage,image1.image, image2.image)
      } else {
        temp = await apiCall(refImage,image1.image, null)
      }
      setProgress(progress+prog*2);
    }
    setProgress(100);
    setFetching(false);
  }

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user"
  };
  const [imgsr, setImgsr] = useState('');
  const imageDownload = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg'; // You can customize the downloaded file name here
    link.click();
  };
  return (
    <div className='dashboard'>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className='findhead'>Welcome to VisualMilap...</div>
      <div className='findfind'>Find your photos here.</div>
      {fetched && <div><div className="scan">Take a Photo</div>
      <div className='webcam'>
      <Webcam
        audio={false}
        height={300}
        screenshotFormat="image/jpeg"
        width={300}
        videoConstraints={videoConstraints}
        style={{boxShadow: '0px 0px 20px white'}}
      >
      {({ getScreenshot }) => (
        <button
          onClick={async () => {
            const imageSrc =  await getScreenshot()
            setFetched(false);
            showImages(imageSrc);
          }}
          className='capture'
      >
        Capture
      </button>
    )}
  </Webcam></div></div>}
    {fetching && <div style={{width: '100%', display: 'flex', justifyContent:'space-around', marginTop:'2%'}}><div className='fetchingimg'>Fetching Your Images...</div></div>}
  <div className='fetchimglist'>
    {yourImages.map((ele)=>{
      return <div className='eachimglist'>
        <img src={ele} alt='your' className='h-[300px]'/><span className='deletebtn' onClick={()=>imageDownload(ele)}><span className='icondel'><i class="fa-solid fa-download"></i></span></span>
        </div>
    })}
  </div>
    </div>
  )
}

export default FindYourPhotos
