import { useState } from "react";
import ImageContext from './imageContext';

const ImageState = (props)=>{
    const host = "http://localhost:4000";
    const imagesIntial = [];
    const [images, setImages] = useState(imagesIntial);
    const arr = [];
    const [titles, setTitles] = useState(imagesIntial);

    //get all images
    const getImages = async (authToken)=>{
        //api call
        if(authToken){
          const url = `${host}/api/imgup/fetchimages`;
          const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken
          },
          });
          const json = await response.json();
          await setImages(json);
          json.forEach(element => {
            if(!arr.includes(element.title)){
              arr.push(element.title);
            }
          });
          setTitles(arr);
        }
        else{
          console.log("Gayab")
          setImages([]);
          setTitles([]);
        }
        return arr;
      }

      const getTitledImages = async (authToken, title)=>{
        if(authToken){
          console.log(authToken)
          const url = `${host}/api/imgup/fetchtitledimages`;
          const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken
          },
          body: JSON.stringify({title: title})
          });
          const json = await response.json();
          console.log(json)
          setImages(json);
        }
      }

      //addimage
      const addImage = async (title, image)=>{
        //api call
        const url = `${host}/api/imgup/addimage`;
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, image})
        });
        getImages(localStorage.getItem('token'));
      }

      const delImg = async (id)=>{
        const url = `${host}/api/imgup/deleteimage`;
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({id})
        });
      }
      return(
        <ImageContext.Provider value={{images:images, setImages, getImages, addImage, titles, setTitles, getTitledImages, delImg}}>
            {props.children}
        </ImageContext.Provider>
      )
}
export default ImageState;