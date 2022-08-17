import fileImg from "@/asset/file-upload.png";
import { FilePlaceholderWrapper } from "./style";

const FilePlaceholder = () => {
  return (
    <FilePlaceholderWrapper>
      <div className="icon">
        <img src={fileImg} alt="" />
      </div>

      <div className="text">Chỉ hỗ trợ file PDF, file Word</div>
      <div className="helper">Click chọn hoặc kéo thả file</div>
    </FilePlaceholderWrapper>
  );
};

export default FilePlaceholder;
