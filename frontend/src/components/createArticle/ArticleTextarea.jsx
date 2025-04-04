import React, { forwardRef, useEffect } from "react";

const ArticleTextarea = forwardRef((props, ref) => {
  const { onChange, initValue, ...rest } = props;

  const handleChange = (e) => {
    // e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    if (onChange) onChange(e);
  };

  useEffect(() => {
    // If there's an initial value, we can trigger the change behavior manually
    console.log(ref.current);
    if (ref.current) {
      handleChange({ target: ref.current });
    }
  }, []);
  return (
    <textarea
      {...rest}
      className="form-control custom-textarea"
      ref={ref}
      onChange={handleChange}
      defaultValue={initValue}
      onFocus={handleChange}
    />
  );
});

export default ArticleTextarea;
