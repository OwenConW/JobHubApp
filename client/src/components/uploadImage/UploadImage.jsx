import React from "react"
import Axios from "axios"


export default function UploadImage(){

  
    const [image, setImage] = React.useState("")
    const [imageUpload, setImageUpload] = React.useState("")

    const uploadImage = async () => {
      const formData = new FormData()
      formData.append("file", image)
      formData.append("upload_preset", "jobhubapp")
      const res = await Axios.post("https://api.cloudinary.com/v1_1/owenconw/image/upload", formData)
      const file = await res.data
      console.log("file", file)
      setImageUpload(file.secure_url)
    }
    
    return(
        <>
          <div>
          <input
          type="file"
          onChange={(event) => {
            setImage(event.target.files[0])
          }}>
          </input>
          <br></br>
          <br></br>
          </div>
          <button onClick={uploadImage}>Upload Image</button>
          {
            setImageUpload.length && <img src={imageUpload}></img>
          }
        </>
    )
}