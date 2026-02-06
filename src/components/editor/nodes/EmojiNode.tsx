import type { ReactNode } from "react";
import {
  type DOMConversionMap,
  type DOMExportOutput,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
  DecoratorNode,
} from "lexical";
import { api } from "~/lib/trpc/client";
import { Loader2 } from "lucide-react";

export type SerializedEmojiNode = Spread<
  {
    emojiName: string;
  },
  SerializedLexicalNode
>;

// Component for rendering emoji in the editor
function EmojiComponent({ name }: { name: string }) {
  return (
    <span
      className="inline-emoji"
      data-emoji-name={name}
      title={`:${name}:`}
    >
      <InlineEmojiImage name={name} />
    </span>
  );
}

// Component that handles loading and displaying the emoji image
function InlineEmojiImage({ name }: { name: string }) {
  // Fetch all emojis to get the URL for this emoji
  const { data: emojis, isLoading } = api.reaction.listEmoji.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

  const emoji = emojis?.find((e) => e.name === name);

  if (isLoading) {
    return <Loader2 className="inline h-[1.2em] w-[1.2em] animate-spin align-text-bottom" />;
  }

  if (!emoji) {
    // Fallback: show the text representation
    return <span className="text-muted-foreground">:{name}:</span>;
  }

  return (
    <img
      src={emoji.imageUrl}
      alt={`:${name}:`}
      className="inline h-[1.2em] w-[1.2em] align-text-bottom object-contain"
    />
  );
}

export class EmojiNode extends DecoratorNode<ReactNode> {
  __emojiName: string;

  static getType(): string {
    return "emoji";
  }

  static clone(node: EmojiNode): EmojiNode {
    return new EmojiNode(node.__emojiName, node.__key);
  }

  constructor(emojiName: string, key?: NodeKey) {
    super(key);
    this.__emojiName = emojiName;
  }

  createDOM(): HTMLElement {
    const element = document.createElement("span");
    element.className = "inline-emoji-wrapper";
    return element;
  }

  updateDOM(): boolean {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("span");
    element.className = "inline-emoji";
    element.setAttribute("data-emoji-name", this.__emojiName);
    element.textContent = `:${this.__emojiName}:`;
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.classList.contains("inline-emoji")) {
          return null;
        }
        return {
          conversion: (element: HTMLElement) => {
            const emojiName = element.getAttribute("data-emoji-name") || "";
            return {
              node: $createEmojiNode(emojiName),
            };
          },
          priority: 1,
        };
      },
    };
  }

  static importJSON(serializedNode: SerializedEmojiNode): EmojiNode {
    return $createEmojiNode(serializedNode.emojiName);
  }

  exportJSON(): SerializedEmojiNode {
    return {
      type: "emoji",
      version: 1,
      emojiName: this.__emojiName,
    };
  }

  getEmojiName(): string {
    return this.__emojiName;
  }

  getTextContent(): string {
    return `:${this.__emojiName}:`;
  }

  isInline(): boolean {
    return true;
  }

  decorate(): ReactNode {
    return <EmojiComponent name={this.__emojiName} />;
  }
}

export function $createEmojiNode(emojiName: string): EmojiNode {
  return new EmojiNode(emojiName);
}

export function $isEmojiNode(
  node: LexicalNode | null | undefined
): node is EmojiNode {
  return node instanceof EmojiNode;
}
