import React, { useRef } from 'react'

export const AddImage = ({
  imagePlace,
  setImagePlace,
  imagePreviewUrl,
  setImagePreviewUrl,
}) => {
  let fileInput = useRef()
  const handleChangeImage = event => {
    let reader = new FileReader()
    let file = event.target.files[0]
    console.log(file, reader.result)
    reader.onloadend = () => {
      setImagePlace(file)
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
    // console.log(fileInput.current)
  }

  // const deleteImage = event => {
  //   const img = imagePreviewUrl.filter((value, index) => {
  //     return event.target.id != index
  //   })
  //   const imgname = imagePlace.filter((value, index) => {
  //     return event.target.id != index
  //   })
  //   setImagePlace(imgname)
  //   setImagePreviewUrl(img)
  // }

  // const Image = imagePreviewUrl && ((image, index) => {
  //   return (
  //     <Fragment key={index}>
  //       <img src={image} alt=""></img>
  //       <button type="button" id={index} onClick={deleteImage}>
  //         ╳
  //       </button>
  //     </Fragment>
  //   )
  // })

  return (
    <>
      <p>Загрузите фото места</p>
      <input
        type="file"
        onChange={handleChangeImage}
        // value={imagePlace}
        ref={fileInput}
        accept="image/jpeg"
      ></input>
      {imagePreviewUrl && (
        <div>
          <img src={imagePreviewUrl} alt="" style={{ width: '50%' }}></img>
          {/* <button type="button" onClick={deleteImage}>
                ╳
              </button> */}
        </div>
      )}
    </>
  )
}
