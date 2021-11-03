import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

// import tinymce from "tinymce/tinymce";
// import "tinymce/plugins/image";

export default function Tiny() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const my_upload_handler = (blobInfo, success, failure) => {
    var reader = new FileReader();
    reader.readAsDataURL(blobInfo.blob());
    reader.onload = () => {
      return success(this.result);
    };
  };
  // NOTAS: en la linea 45 añadí image y table. Este toolbar es lo que el agente ve en la barra.
  // También coloqué "menubar": true. En plugins, ahi se supone que estan todas las opciones habilitadas, entonces en plugins se verian en el menu
  // (que si file, nuevo documento, editar) y en toolbar lo que se ve en icono pequeño
  return (
    <>
      <Editor
        tinymceScriptSrc={
          process.env.PUBLIC_URL + "tinymce/js/tinymce/tinymce.min.js"
        }
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "image table removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          // images_upload_url: "testing.php",
          images_upload_handler: my_upload_handler,
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
