import {
  type DOMConversionMap,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalNode,
  type NodeKey,
  type SerializedTextNode,
  type Spread,
  TextNode,
} from "lexical";

export type MentionType = "user" | "project";

export type SerializedMentionNode = Spread<
  {
    mentionType: MentionType;
    mentionId: string;
    mentionName: string;
  },
  SerializedTextNode
>;

export class MentionNode extends TextNode {
  __mentionType: MentionType;
  __mentionId: string;
  __mentionName: string;

  static getType(): string {
    return "mention";
  }

  static clone(node: MentionNode): MentionNode {
    return new MentionNode(
      node.__mentionType,
      node.__mentionId,
      node.__mentionName,
      node.__key
    );
  }

  constructor(
    mentionType: MentionType,
    mentionId: string,
    mentionName: string,
    key?: NodeKey
  ) {
    super(`@${mentionName}`, key);
    this.__mentionType = mentionType;
    this.__mentionId = mentionId;
    this.__mentionName = mentionName;
  }

  createDOM(config: EditorConfig): HTMLElement {
    // For user mentions, create a link element
    if (this.__mentionType === "user") {
      const element = document.createElement("a");
      element.className = "mention mention-user";
      element.setAttribute("data-mention-type", this.__mentionType);
      element.setAttribute("data-mention-id", this.__mentionId);
      element.href = `/user/${this.__mentionId}`;
      element.textContent = `@${this.__mentionName}`;
      // Prevent the link from capturing all cursor navigation
      element.contentEditable = "false";
      return element;
    }

    // For project mentions, create a link element
    const element = document.createElement("a");
    element.className = "mention mention-project";
    element.setAttribute("data-mention-type", this.__mentionType);
    element.setAttribute("data-mention-id", this.__mentionId);
    element.href = `/projects/${this.__mentionId}`;
    element.textContent = `@${this.__mentionName}`;
    element.contentEditable = "false";
    return element;
  }

  exportDOM(): DOMExportOutput {
    // For user mentions, export as a link
    if (this.__mentionType === "user") {
      const element = document.createElement("a");
      element.className = "mention mention-user";
      element.setAttribute("data-mention-type", this.__mentionType);
      element.setAttribute("data-mention-id", this.__mentionId);
      element.href = `/user/${this.__mentionId}`;
      element.textContent = `@${this.__mentionName}`;
      return { element };
    }

    // For project mentions, export as a link
    const element = document.createElement("a");
    element.className = "mention mention-project";
    element.setAttribute("data-mention-type", this.__mentionType);
    element.setAttribute("data-mention-id", this.__mentionId);
    element.href = `/projects/${this.__mentionId}`;
    element.textContent = `@${this.__mentionName}`;
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    const conversionFn = (element: HTMLElement) => {
      const mentionType =
        (element.getAttribute("data-mention-type") as MentionType) ||
        "user";
      const mentionId = element.getAttribute("data-mention-id") || "";
      const mentionName =
        element.textContent?.replace("@", "") || "";
      return {
        node: $createMentionNode(mentionType, mentionId, mentionName),
      };
    };

    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.classList.contains("mention")) {
          return null;
        }
        return {
          conversion: conversionFn,
          priority: 1,
        };
      },
      a: (domNode: HTMLElement) => {
        if (!domNode.classList.contains("mention")) {
          return null;
        }
        return {
          conversion: conversionFn,
          priority: 1,
        };
      },
    };
  }

  static importJSON(serializedNode: SerializedMentionNode): MentionNode {
    return $createMentionNode(
      serializedNode.mentionType,
      serializedNode.mentionId,
      serializedNode.mentionName
    );
  }

  exportJSON(): SerializedMentionNode {
    return {
      ...super.exportJSON(),
      type: "mention",
      mentionType: this.__mentionType,
      mentionId: this.__mentionId,
      mentionName: this.__mentionName,
    };
  }

  getMentionType(): MentionType {
    return this.__mentionType;
  }

  getMentionId(): string {
    return this.__mentionId;
  }

  getMentionName(): string {
    return this.__mentionName;
  }

  canInsertTextBefore(): boolean {
    return false;
  }

  canInsertTextAfter(): boolean {
    return false;
  }

  isTextEntity(): boolean {
    return true;
  }
}

export function $createMentionNode(
  mentionType: MentionType,
  mentionId: string,
  mentionName: string
): MentionNode {
  return new MentionNode(mentionType, mentionId, mentionName).setMode("token");
}

export function $isMentionNode(
  node: LexicalNode | null | undefined
): node is MentionNode {
  return node instanceof MentionNode;
}
