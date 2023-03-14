import { black, blue, cyan, green, lime, orange, pink, purple, red, teal, yellow } from 'material-colors';

export interface NoImageItemProps {
  onClick: () => void;

  name: string;
}


export function NoImageItem(props: NoImageItemProps) {
  const { name, onClick } = props;

  const random = Math.round(Math.random() * 11);
  const colors = [red[900], blue[900], black[900], pink[900], cyan[900], teal[900], orange[900], yellow[900], green[900], lime[900], purple[900]];
  
  return (
    <div className="no-image-item" key={ name } onClick={ onClick }>
      <div className="image"  style={ { backgroundColor: colors[random] } }><i className="fas fa-images" /></div>
      <span className="image-label">{ name }</span>
    </div>
  );
}
