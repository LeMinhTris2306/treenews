import React, { forwardRef, useState } from "react";

const ArticleImage = forwardRef((props, ref) => {
  const { ...rest } = props;

  const [img, setImg] = useState(null);
  const [imgSize, setImgSize] = useState("");

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(event.target.files[0]);
      setImgSize(
        parseFloat((event.target.files[0].size / (1024 * 1024)).toFixed(2))
      );
    }
  };
  return (
    <>
      <div className="d-flex flex-column form-control custom-img border-0">
        {img && (
          <img
            src={img && URL.createObjectURL(img)}
            alt="preview-img"
            className="card-img-top img-fluid rounded "
          />
        )}
        <div>{img && <div>Size: {imgSize} Mb</div>}</div>
        <input
          ref={ref}
          {...rest}
          type="file"
          className="filetype pb-1"
          accept=".jpg, .jpeg, .png, .webp"
          onChange={handleChange}
        />
      </div>
    </>
  );
});

export default ArticleImage;
