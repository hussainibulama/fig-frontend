const Input = ({ clas, type, onchange, holder, name, required }) => {
  return (
    <>
      <input
        className={clas}
        type={type}
        onChange={onchange}
        placeholder={holder}
        name={name}
        required={required}
      />
    </>
  );
};
export default Input;
