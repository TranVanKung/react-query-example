import { useState } from "react";
import { connect } from "react-redux";
import { DeleteFilled, EyeFilled } from "@ant-design/icons";
import { FILE_TYPE } from "@/util/config.js";
import { BaseFileInputWrapper } from "./style";

const BaseFileInput = (props) => {
  const { onChange, name, fileInfo, placeholder, value, onReset, type } = props;
  const [isHover, setIsHover] = useState(false);

  const onOpenPreviewModal = () => {};

  return (
    <BaseFileInputWrapper>
      <div className="drop-zone">
        <div>{fileInfo ?? placeholder}</div>
        <div className="process"></div>

        <input
          type="file"
          name={name}
          onDragEnd={() => setIsHover(true)}
          onDragLeave={() => setIsHover(false)}
          onDrop={() => setIsHover(false)}
          onChange={onChange}
        />

        {value ? (
          <div className="tool">
            {type === FILE_TYPE.IMAGE ? (
              <div className="preview-icon">
                <EyeFilled onClick={onOpenPreviewModal} />
              </div>
            ) : null}

            <div className="delete-icon">
              <DeleteFilled onClick={onReset} />
            </div>
          </div>
        ) : null}
      </div>

      {value && typeof value !== "string" ? (
        <div className="file-info">
          <div className="file-name">{value?.name}</div>
          <div className="file-size">{Math.round(value?.size / 1000)} KB</div>
        </div>
      ) : null}
    </BaseFileInputWrapper>
  );
};

export default connect((state) => ({}), {})(BaseFileInput);
