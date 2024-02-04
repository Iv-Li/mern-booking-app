type UploadedFile = {
  file: File,
  url: string
}
export const transformUrlIntoFiles = (imgUrls: UploadedFile[]): FileList => {
  const dataTransfer = new DataTransfer()
  imgUrls?.forEach(file => {
    console.log({ file })
    dataTransfer.items.add(file.file)
  })
  return dataTransfer.files
}

export const filterFiles = (imgUrlFilter: string, imgUrls: UploadedFile[]): FileList => {
  const dataTransfer = new DataTransfer()
  imgUrls?.forEach(file => {
    if (file.url !== imgUrlFilter) {
      console.log({ BEFORE: file })
      dataTransfer.items.add(file.file)
    }
  })
  return dataTransfer.files
}

export const combineSeveralFileList = (...fileLists: (FileList | UploadedFile[] | null | undefined)[] ): FileList => {
  console.log(fileLists)
  const dataTransfer = new DataTransfer()
  fileLists.forEach(fileList => {
    if(!fileList) return

    if (fileList instanceof FileList) {
      Array.from(fileList).forEach(file => {
        console.log({ file })
        dataTransfer.items.add(file)
      })
      return
    }

    fileList.forEach(file => {
      console.log({ file })
      dataTransfer.items.add(file.file)
    })
  })
  return dataTransfer.files
}