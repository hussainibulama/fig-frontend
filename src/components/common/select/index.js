const Select = ({ clas, defText, onchange, options }) => {
  return (
    <>
      <select className={clas} onChange={onchange}>
        <option className="default" hidden selected disabled>
          {defText}
        </option>
        {options.map((text, key) => (
          <option key={key}>{text}</option>
        ))}
      </select>
    </>
  );
};
export default Select;
