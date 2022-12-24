
export interface NoImageItemProps {
  name: string;
}


export function NoImageItem(props: NoImageItemProps) {
  const { name } = props;
  return (
    <div className="no-image-item" key={ name }>
      <div className="image"><i className="fas fa-images" /></div>
      <span className="image-label">{ name }</span>
    </div>
  );
}
