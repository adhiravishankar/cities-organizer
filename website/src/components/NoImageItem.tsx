export interface NoImageItemProps {
  onClick: () => void;

  name: string;
}


export function NoImageItem(props: NoImageItemProps) {
  const { name, onClick } = props;

  return (
    <div className="no-image-item" key={ name } onClick={ onClick }>
      <div className="image"><i className="fas fa-images" /></div>
      <span className="image-label">{ name }</span>
    </div>
  );
}
