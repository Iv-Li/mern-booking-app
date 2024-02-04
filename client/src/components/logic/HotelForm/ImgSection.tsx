import { useFormContext } from 'react-hook-form';
import type { HotelFormData } from '@/types';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { HotelFormImg } from '@/components/logic/HotelForm/HotelFormImg.tsx';
import { combineSeveralFileList, filterFiles, transformUrlIntoFiles } from '@/utils';

type UploadedFile = {
  file: File,
  url: string
}
export const ImgSection = () => {
  const [uploadedImgUrls, setUploadedImgUrls] = useState<UploadedFile[]>([])

  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext<HotelFormData>()

  const serverImageUrls = watch("imageUrls")
  const uploadedImgs = watch("imageFiles")

  const handleDelete = (
    e: MouseEvent<HTMLButtonElement>,
    imgUrl: string
  ) => {
    e.preventDefault()
    setValue("imageUrls", serverImageUrls.filter(url => url !== imgUrl))
    setValue("imageFiles", uploadedImgs && filterFiles(imgUrl, uploadedImgUrls))
  }

  const pushIntoImageFiles = (e: ChangeEvent<HTMLInputElement>): void => {
    const uploaded = e.target.files
    console.log({ pushIntoImageFiles: uploaded })
    const allCurrentUploaded = combineSeveralFileList(uploaded, transformUrlIntoFiles(uploadedImgUrls))
    setValue("imageFiles", allCurrentUploaded)
  }

  const inputImageFilesValidation = useCallback((imageFiles: FileList): string | boolean => {
    const totalLength = imageFiles.length

    if (totalLength === 0) {
      return "At least one image should be added";
    }

    if (totalLength > 6) {
      return "Total number of images cannot be more than 6";
    }

    return true;
  }, [])

  const checkGeneralImageAmount = useCallback((totalImgAmount: number) => {

    if(totalImgAmount > 6) {
      setError("imageFiles", {
        type:"custom",
        message: `Max amount of all images equals 6. You have already downloaded ${totalImgAmount}`
      })
    } else {
      clearErrors("imageFiles")
    }
  }, [setError, clearErrors])


  useEffect(() => {
    const uploaded = uploadedImgs ? Array.from(uploadedImgs).map(file => ({
      file,
      url: URL.createObjectURL(file)
    })) : []
    setUploadedImgUrls(uploaded)
  }, [uploadedImgs])

  useEffect(() => {
    const serverImgAmount = serverImageUrls?.length || 0
    const uploadedImgAmount = uploadedImgUrls?.length || 0
    const totalAmount = serverImgAmount + uploadedImgAmount

    checkGeneralImageAmount(totalAmount)
  }, [uploadedImgUrls, serverImageUrls, checkGeneralImageAmount])


  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {!!serverImageUrls?.length && (
          <>
            <h5>Earlier uploaded images: {serverImageUrls.length}</h5>
            <div className="grid grid-cols-6 gap-4">
              {serverImageUrls.map((url) => (
                <HotelFormImg url={url} handleDelete={handleDelete}/>
              ))}
            </div>
          </>

        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: inputImageFilesValidation,
            onChange: pushIntoImageFiles
          })}
        />
        {!!uploadedImgUrls?.length && (
          <>
            <h5>Now uploaded images: {uploadedImgUrls.length}</h5>
            <div className="grid grid-cols-6 gap-4">
              {uploadedImgUrls.map((url) => (
                <HotelFormImg url={url.url} handleDelete={handleDelete}/>
              ))}
            </div>
          </>
        )}
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}

    </div>
  )
}