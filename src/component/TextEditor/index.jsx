import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { TextEditorWrapper } from "./style";

let onChangeTimeout = null;

const TextEditor = (props) => {
  const { onChange, content = "" } = props;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (content) {
      const contentBlock = htmlToDraft(content);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
        contentBlock.entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [content]);

  const onEditorChange = (value) => {
    const htmlContent = draftToHtml(convertToRaw(value.getCurrentContent()));
    setEditorState(value);

    if (onChangeTimeout) {
      clearTimeout(onChangeTimeout);
      onChangeTimeout = null;
    } else {
      onChangeTimeout = setTimeout(() => {
        onChange && onChange(htmlContent);
      }, 100);
    }
  };

  return (
    <TextEditorWrapper>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorChange}
        wrapperClassName="editor-container"
        editorClassName="editor-content"
        toolbarClassName="editor-toolbar"
        toolbar={{
          options: ["inline", "list", "textAlign", "history"],
        }}
      />
    </TextEditorWrapper>
  );
};

export default TextEditor;
