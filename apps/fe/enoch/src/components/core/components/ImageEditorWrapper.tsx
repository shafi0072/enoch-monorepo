import React from "react";
// @ts-ignore
import ImageEditor from "tui-image-editor";

interface EditorProps {
  onEditorInit: any;
  options: any;
  
}

class ImageEditorWrapper extends React.Component <EditorProps> {
  editorRef: React.RefObject<any>;
  editor: any;

  constructor(props:any) {
    super(props);
    this.editorRef = React.createRef();
    this.editor = null;
  }

  componentDidMount() {
    this.editor = new ImageEditor(this.editorRef.current, {
      ...this.props.options,
    });
    process.nextTick(() => this.props.onEditorInit(this.editor));
  }
  componentDidUpdate() {
    // process.nextTick(() => this.props.onEditorInit(this.editor));
  }

  render() {
    return (
      <div
        id="tui-image-editor"
        className="w-100 h-100"
        ref={this.editorRef}
      ></div>
    );
  }
}

export default ImageEditorWrapper;
