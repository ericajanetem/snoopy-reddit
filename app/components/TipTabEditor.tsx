"use client";

import { Button } from "@/components/ui/button";
import { type Editor, useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit' 

export const Menubar = ({editor}: {editor: Editor | null}) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-5">
            <Button type="button" 
                    onClick={()=>editor.chain().focus().toggleHeading({level: 1}).run()}>
            H1
            </Button>
        </div>
    );
}

export function TipTabEditor({setJson, json} :{setJson: any, json: JSONContent | null}) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: json ?? <p>No Content</p>,
        editorProps: {
            attributes: {
                class: 'prose'
            },
        },
        onUpdate: ({editor}) => {
            const json = editor.getJSON();
            setJson(json);
        }
      });

    return (
        <div>
            <Menubar editor={editor} />
            <EditorContent editor={editor} className="rounded-lg border p-2 min-h-[150] mt-2"/>
        </div>
    )
}