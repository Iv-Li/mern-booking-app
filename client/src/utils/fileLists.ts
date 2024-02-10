type UploadedFile = {
  file: File,
  url: string
}
export const transformUrlIntoFiles = (imgUrls: UploadedFile[]): FileList => {
  const dataTransfer = new DataTransfer()
  imgUrls?.forEach(file => {
    dataTransfer.items.add(file.file)
  })
  return dataTransfer.files
}

export const filterFiles = (imgUrlFilter: string, imgUrls: UploadedFile[]): FileList => {
  const dataTransfer = new DataTransfer()
  imgUrls?.forEach(file => {
    if (file.url !== imgUrlFilter) {
      dataTransfer.items.add(file.file)
    }
  })
  return dataTransfer.files
}

export const combineSeveralFileList = (...fileLists: (FileList | UploadedFile[] | null | undefined)[] ): FileList => {
  const dataTransfer = new DataTransfer()
  fileLists.forEach(fileList => {
    if(!fileList) return

    if (fileList instanceof FileList) {
      Array.from(fileList).forEach(file => {
        dataTransfer.items.add(file)
      })
      return
    }

    fileList.forEach(file => {
      dataTransfer.items.add(file.file)
    })
  })
  return dataTransfer.files
}