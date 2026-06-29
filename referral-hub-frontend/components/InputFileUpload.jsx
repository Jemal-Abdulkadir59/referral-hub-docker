import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Box } from '@mui/material'
import { useState } from 'react'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const InputFileUpload = ({ onChange, fileField }) => {
  const [fileName, setFileName] = useState(null)
  const [fileUrl, setFileUrl] = useState(null)

  const handleFileChange = event => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setFileName(file.name)
      setFileUrl(URL.createObjectURL(file))
    }
    if (onChange) {
      onChange(event)
    }
  }

  return (
    <Box>
      <Button component='label' role={undefined} variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
        Upload {fileField}
        <VisuallyHiddenInput type='file' onChange={handleFileChange} />
      </Button>
      {fileName && <div>Selected file: {fileName}</div>}
      {fileUrl && (
        <div>
          {fileName.match(/\.(jpeg|jpg|png|gif)$/i) ? (
            <img src={fileUrl} alt={fileName} style={{ width: '200px', height: 'auto' }} />
          ) : fileName.match(/\.(pdf)$/i) ? (
            <embed src={fileUrl} type='application/pdf' width='200px' height='auto' />
          ) : (
            <p>Preview not available for this file type</p>
          )}
        </div>
      )}
    </Box>
  )
}

export default InputFileUpload
