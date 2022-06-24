const Select = ({ clas, defText, onchange, options }) => {
  return (
    <>
      <select className={clas} defaultValue={"DEFAULT"} onChange={onchange}>
        <option value="DEFAULT" className="default" hidden disabled>
          {defText}
        </option>
        {options.map((text, key) => (
          <option value={text} key={key}>
            {text}
          </option>
        ))}
      </select>
    </>
  );
};
export default Select;
