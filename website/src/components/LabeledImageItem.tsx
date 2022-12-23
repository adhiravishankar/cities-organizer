
export interface LabeledImageItemProps {
  source: string;

  name: string;
}


export const LabeledImageItem = (image: LabeledImageItemProps) => {
  const { name, source } = image;
  return (
    <div key={ name }>
      <img
        src={ source }
        alt={ name }
        loading="lazy"
      />
      <div
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)', top: 0, left: 0, position: 'absolute' }}
        title={ name }
      />
    </div>
  );
};
