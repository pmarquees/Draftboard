"use client";

import { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  COMMAND_PRIORITY_HIGH,
  PASTE_COMMAND,
} from "lexical";
import { $createAttachmentNode, type AttachmentType } from "../nodes/AttachmentNode";
import { api } from "~/lib/trpc/client";

/**
 * Plugin that handles pasting files (images, videos, other files) from clipboard.
 * When a file is pasted, it's uploaded to R2 and inserted as an attachment node.
 */
export function PasteFilePlugin() {
  const [editor] = useLexicalComposerContext();
  const uploadMutation = api.upload.getUploadUrl.useMutation();

  const uploadAndInsertFiles = useCallback(
    async (files: File[]) => {
      for (const file of files) {
        try {
          // Generate filename for clipboard items that don't have one
          let filename = file.name;
          if (!filename || filename === "image.png" || filename === "blob") {
            const extension = file.type.split("/")[1] || "bin";
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            filename = `pasted-${timestamp}.${extension}`;
          }

          const result = await uploadMutation.mutateAsync({
            filename,
            contentType: file.type,
            size: file.size,
          });

          // Upload to R2
          await fetch(result.uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });

          // Determine attachment type
          let attachmentType: AttachmentType = "FILE";
          if (file.type.startsWith("image/")) {
            attachmentType = "IMAGE";
          } else if (file.type.startsWith("video/")) {
            attachmentType = "VIDEO";
          }

          // Insert attachment node
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              const attachmentNode = $createAttachmentNode({
                attachmentType,
                url: result.publicUrl,
                filename,
                mimeType: file.type,
                size: file.size,
              });
              selection.insertNodes([attachmentNode, $createParagraphNode()]);
            }
          });
        } catch (error) {
          console.error("Paste upload failed:", error);
        }
      }
    },
    [editor, uploadMutation]
  );

  useEffect(() => {
    return editor.registerCommand(
      PASTE_COMMAND,
      (event) => {
        // Get clipboard data from the event if available
        const clipboardData =
          "clipboardData" in event ? event.clipboardData : null;
        if (!clipboardData) return false;

        // Check if there are files in clipboard
        const files = clipboardData.files;
        if (!files || files.length === 0) return false;

        // Filter for actual files (not empty)
        const actualFiles = Array.from(files).filter((file) => file.size > 0);
        if (actualFiles.length === 0) return false;

        // Handle the upload asynchronously
        uploadAndInsertFiles(actualFiles);
        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor, uploadAndInsertFiles]);

  return null;
}
