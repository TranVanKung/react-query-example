const Icon = (props) => {
  const { name, style } = props;

  return (
    <span className="material-icons-outlined" style={style}>
      {name}
    </span>
  );
};

export default Icon;
