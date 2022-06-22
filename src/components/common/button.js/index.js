const Button = ({ clas, disabled, onclick, name }) => {
  return (
    <>
      <button className={clas} disabled={disabled} onClick={onclick}>
        {name}
      </button>
    </>
  );
};
export default Button;
