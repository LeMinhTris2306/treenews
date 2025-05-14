import React, { forwardRef, useEffect } from "react";

const ArticleTextarea = forwardRef((props, ref) => {
    const { onChange, initValue, ...rest } = props;

    const handleChange = (e) => {
        // e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
        if (onChange) onChange(e);
    };

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
