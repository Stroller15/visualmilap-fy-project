import React, { useContext, useEffect, useState, useRef } from 'react'
import './Dashboard.css'
import imageContext from '../context/images/imageContext'
import LoadingBar from 'react-top-loading-bar'

export default function DashBoard(props) {
  const context = useContext(imageContext);
  const {images, setImages, getImages, addImage, titles, setTitles, delImg} = context;
  const [check, setCheck] = useState(true);
  const [reren, setReren] = useState(0);
  const [imgtitle, setImgTitle] = useState('');
  const [direname, setDirename] = useState('');
  const [upimage, setUpimage] = useState([]);
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
      if(localStorage.getItem('token')!=='null'){
        getImages(localStorage.getItem('token'));
      }
  },[]);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const handledir = (hululu)=>{
    setProgress(90)
    setCheck(false);
    setDirename(hululu);
    setProgress(100);
    console.log(direname);
  }
  const goback = ()=>{
    console.log('clicked');
    setCheck(true);
  }
  const handleClick1 = ()=>{
    if(!titles.includes(imgtitle)){
      let arr = titles;
      arr.push(imgtitle)
      setTitles(arr);
      setReren(reren+1);
      console.log(titles)
    }
  }
  const handleClick2 = ()=>{
    upimage.forEach(element => {
      addImage(direname,element);
    });
  }
  const onChange1 = (e)=>{
    setImgTitle(e.target.value);
  }
  const onChange2 = (e)=>{
    console.log(e.target.files);
    let temp = e.target.files;
    
    let arr = upimage;
    for(let i=0;i<temp.length;i++) {
      let reader = new FileReader();
      reader.readAsDataURL(temp[i]);
      reader.onload = ()=>{
        arr.push(reader.result);
        setUpimage(arr);
      }
    }
    
  }

  const createLink = ()=>{
    let currLink = window.location.href;
    let accessLink = `${currLink.slice(0,currLink.length-9)}findyourphotos?auth=${localStorage.getItem('token')}&event=${direname}`;
    navigator.clipboard.writeText(accessLink);
    props.showAlert("Link Copied!","success")
  }

  const deleteImage = (id, index)=>{
    let arr = images.filter((_,i)=> i!==index);
    setImages([...arr]);
    delImg(id);
  }

  const newevent = ()=>{
    ref1.current.click();
  }
  const newimg = ()=>{
    ref2.current.click()
  }
  
  return (
    <div className='dashboard'>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      
      <button ref={ref1} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1">
          Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">New Event</h1>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">
                            Title
                        </label>
                        <input
                            value={imgtitle}
                            type="text"
                            className="form-control"
                            id="etitle"
                            name="etitle"
                            aria-describedby="emailHelp"
                            onChange={onChange1}
                        />
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={check ? handleClick1 : handleClick2} data-bs-dismiss="modal">Save Changes</button>
                </div>
                </div>
            </div>
        </div>

        <button ref={ref2} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
          Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Upload Images</h1>
                </div>
                <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">
                            Images
                        </label>
                        <input
                            type="file"
                            multiple
                            className="form-control"
                            id="etitle"
                            name="etitle"
                            aria-describedby="emailHelp"
                            onChange={onChange2}
                        />
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={check ? handleClick1 : handleClick2} data-bs-dismiss="modal">Save Changes</button>
                </div>
                </div>
            </div>
        </div>

      {!check && <div className='back' onClick={goback}><i className="fa-solid fa-arrow-left"></i></div>}

      <div className="welcome">Welcome</div>
      
      <div style={{display: 'flex', justifyContent: 'space-between',margin:'0 2% 0 2%'}}>
        {check ? <div className="events">Your Events</div> : <div className="events">Your Images <i className="fa-solid fa-share" onClick={createLink}></i></div>}
        <div style={{fontSize:'40px'}} onClick={check? newevent : newimg}><i className="fa-solid fa-plus"></i></div>
      </div>
      <hr/>
      <div className='images'>
        {!check && images.map((ele, index)=>{
          if(ele.title === direname){
            return <div key={ele._id} className='oneimg'>
              <img className='h-[300px]' src={ele.image} alt='youimg' style={{boxShadow: '0px 0px 10px wheat'}}/><span className='deletebtn' onClick={()=>deleteImage(ele._id,index)}><span className='icondel'><i className="fa-solid fa-trash-can"></i></span></span>
          </div>
          }
          return null
          
        })}
      </div>
      <div className='directories'>
        {check && titles.map((ele,index)=>{
          return <div id={ele} key={index} className='directory' onClick={()=>{setProgress(10); handledir(ele)}}>
            <i className="fa-regular fa-folder"></i>
            <div style={{textAlign: 'center', color: 'azure'}}>{ele}</div>
          </div>

        })}
      </div>
    </div>
  )
}
