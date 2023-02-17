import { useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

export interface AddPicsProps {
  onCloseModal: () => void;

  refresh: () => void;

  shown: boolean;

  fileUpload: (file: File) => void;
}

export function AddPics(props: AddPicsProps) {
  const onDropAccepted = useCallback(async (files: File[]) => {
    files.forEach((file: File) => {
      props.fileUpload(file);
    });
    props.refresh();
  }, [props.fileUpload, props.onCloseModal, props.refresh]);

  const dropzone = useDropzone({ onDropAccepted, maxFiles: 1 });
  const text = dropzone.isDragActive ? 'Drop the files here...' : 'Drag n\' drop a file here or click to select a file';

  return (
    <Modal show={ props.shown } onHide={ props.onCloseModal }>
      <Modal.Header closeButton={ true }>
        <Modal.Title>Add Pictures</Modal.Title>
      </Modal.Header>
      <div {...dropzone.getRootProps()} className="dropzone-wrapper">
        <input {...dropzone.getInputProps()} />
        <div className="dropzone-text">
          <div>{ text }</div>
          <i className="fas fa-upload" />
        </div>
      </div>
    </Modal>
  );

}
