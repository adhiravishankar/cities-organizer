import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export interface AddPicsProps {
  fileUpload: (file: File) => void;
}

const metroPopupStyle: CSSProperties = {
  width: '20rem',
  height: '20rem',
  backgroundColor: 'white',
  transform: 'translate(-50%, -50%)',
  position: 'absolute' as 'absolute',
  border: '0.1rem solid #000',
  borderRadius: '2rem',
  boxShadow: '2rem',
  top: '50%',
  left: '50%',
};

export function AddPics(props: AddPicsProps) {
  const onDropAccepted = useCallback((files: File[]) => {
    files.forEach((file: File) => props.fileUpload(file));
  }, [props.fileUpload]);
  const dropzone = useDropzone({ onDropAccepted });
  const text = dropzone.isDragActive ? 'Drop the files here...' : 'Drag n\' drop a file here or click to select a file';

  return (
    <div style={ metroPopupStyle }>
      <div {...dropzone.getRootProps()} className="dropzone-wrapper">
        <input {...dropzone.getInputProps()} />
        <div className="dropzone-text">
          <p>{ text }</p>
          <FontAwesomeIcon icon={['fas', 'upload']} style={{ fontSize: '4rem' }} />
        </div>
      </div>
    </div>
  );
  
}
