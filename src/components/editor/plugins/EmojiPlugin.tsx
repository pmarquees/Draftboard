"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { $createTextNode, TextNode } from "lexical";
import { createPortal } from "react-dom";
import { $createEmojiNode } from "../nodes/EmojiNode";
import { api } from "~/lib/trpc/client";
import { Loader2 } from "lucide-react";
import { EmojiImage } from "~/components/settings/EmojiUpload";

class EmojiOption extends MenuOption {
  id: string;
  name: string;
  imageUrl: string;

  constructor(id: string, name: string, imageUrl: string) {
    super(name);
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
  }
}

function EmojiMenuItem({
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: {
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: EmojiOption;
}) {
  return (
    <li
      role="option"
      aria-selected={isSelected}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
        isSelected ? "bg-accent text-accent-foreground" : ""
      }`}
    >
      <EmojiImage
        url={option.imageUrl}
        alt={option.name}
        className="h-5 w-5 flex-shrink-0"
      />
      <span className="truncate">:{option.name}:</span>
    </li>
  );
}

export function EmojiPlugin() {
  const [editor] = useLexicalComposerContext();
  const [queryString, setQueryString] = useState<string | null>(null);

  // Fetch all custom emojis
  const { data: emojis, isLoading } = api.reaction.listEmoji.useQuery();

  // Filter emojis based on query
  const options = useMemo(() => {
    if (!emojis) return [];

    const query = queryString?.toLowerCase() ?? "";
    
    return emojis
      .filter((emoji) => emoji.name.toLowerCase().includes(query))
      .slice(0, 10)
      .map((emoji) => new EmojiOption(emoji.id, emoji.name, emoji.imageUrl));
  }, [emojis, queryString]);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch(":", {
    minLength: 0,
  });

  const onSelectOption = useCallback(
    (
      selectedOption: EmojiOption,
      nodeToReplace: TextNode | null,
      closeMenu: () => void
    ) => {
      editor.update(() => {
        const emojiNode = $createEmojiNode(selectedOption.name);
        if (nodeToReplace) {
          nodeToReplace.replace(emojiNode);
        }
        // Insert a space after the emoji and move cursor there
        const spaceNode = $createTextNode(" ");
        emojiNode.insertAfter(spaceNode);
        spaceNode.select();
      });
      closeMenu();
    },
    [editor]
  );

  // Don't render the plugin if there are no custom emojis
  if (!emojis || emojis.length === 0) {
    return null;
  }

  return (
    <LexicalTypeaheadMenuPlugin<EmojiOption>
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={options}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex }
      ) => {
        // Don't show menu if no anchor or no results and not loading
        if (!anchorElementRef.current || (options.length === 0 && !isLoading)) {
          return null;
        }

        return createPortal(
          <div className="absolute left-0 top-0 z-[9999] min-w-[180px] max-w-[280px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
            {isLoading && options.length === 0 ? (
              <div className="flex items-center justify-center gap-2 px-2 py-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading emojis...</span>
              </div>
            ) : options.length === 0 ? (
              <div className="px-2 py-3 text-sm text-muted-foreground">
                No emoji found
              </div>
            ) : (
              <ul role="listbox">
                {options.map((option, i) => (
                  <EmojiMenuItem
                    key={option.id}
                    isSelected={selectedIndex === i}
                    onClick={() => {
                      setHighlightedIndex(i);
                      selectOptionAndCleanUp(option);
                    }}
                    onMouseEnter={() => {
                      setHighlightedIndex(i);
                    }}
                    option={option}
                  />
                ))}
              </ul>
            )}
          </div>,
          anchorElementRef.current
        );
      }}
    />
  );
}
