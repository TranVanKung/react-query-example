import BaseFileInput from "@/component/Upload/BaseFileInput";
import { FileInputWrapper } from "./style";
import FileInputPlaceholder from "./FilePlaceholder";
import FileInfo from "./FileInfo";

const FileInput = (props) => {
  const { onChange, name, value, style, onReset, type } = props;

  return (
    <FileInputWrapper style={{ ...style }}>
      <BaseFileInput
        onChange={onChange}
        onReset={onReset}
        name={name}
        placeholder={<FileInputPlaceholder />}
        fileInfo={value ? <FileInfo file={value} /> : null}
        value={value}
        type={type}
      />
    </FileInputWrapper>
  );
};

export default FileInput;
