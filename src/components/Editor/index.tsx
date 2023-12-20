"use client";

import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "@/components/MenuBar";

export interface EditorComponentProps {
  value: string;
  onChange: (content: string) => void;
}

const EditorComponent = (props: EditorComponentProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
    ],
    content: props?.value ?? "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      props.onChange(html);
    },
  });

  return (
    <div className="editor mt-3">
      {editor && <MenuBar editor={editor} />}
      <EditorContent
        className="focus:border-0 outline-0 editor__content"
        editor={editor}
      />
    </div>
  );
};

export default EditorComponent;
