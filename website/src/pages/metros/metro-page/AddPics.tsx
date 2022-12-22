import { Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export interface AddPicsProps {
  fileUpload: (file: File) => void;
}

const metroPopupStyle = {
  width: '20rem',
  height: '20rem',
  bgcolor: 'white',
  transform: 'translate(-50%, -50%)',
  position: 'absolute' as 'absolute',
  border: '0.1rem solid #000',
  borderRadius: 2,
  boxShadow: 24,
  top: '50%',
  left: '50%',
};

export function AddPics(props: AddPicsProps) {
  const dropzone = useDropzone();
  dropzone.acceptedFiles.forEach((file: File) => {
    console.log('file upload 1');
    props.fileUpload(file);
  });
  const text = dropzone.isDragActive ? 'Drop the files here...' : 'Drag n\' drop a file here or click to select a file';

  return (
    <Box sx={ metroPopupStyle }>
      <div {...dropzone.getRootProps()} className="dropzone-wrapper">
        <input {...dropzone.getInputProps()} />
        <div className="dropzone-text">
          <p>{ text }</p>
          <FileUploadIcon sx={{ fontSize: '4rem' }} />
        </div>
      </div>
    </Box>
  );
  
}
