import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./textarea";
import { Label } from "./label";
import { Button } from "./button";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A multi-line text input component for longer form content like descriptions, comments, and messages.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    rows: {
      control: "number",
      description: "Number of visible text rows",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Textarea with an associated label for accessibility.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-4">
      <Textarea placeholder="Disabled textarea" disabled />
      <Textarea value="Disabled with content that cannot be edited." disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled textareas cannot be interacted with.",
      },
    },
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const maxLength = 280;
    const currentLength = 0;
    
    return (
      <div className="grid w-full max-w-sm gap-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself..."
          maxLength={maxLength}
        />
        <p className="text-xs text-muted-foreground text-right">
          {currentLength}/{maxLength}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Textarea with a character counter for limited input.",
      },
    },
  },
};

export const WithButton: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Textarea placeholder="Write a comment..." />
      <div className="flex justify-end">
        <Button>Post Comment</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Textarea combined with a submit button for forms.",
      },
    },
  },
};

export const CustomRows: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label>2 rows</Label>
        <Textarea placeholder="Short input..." rows={2} />
      </div>
      <div className="grid gap-1.5">
        <Label>6 rows</Label>
        <Textarea placeholder="Medium input..." rows={6} />
      </div>
      <div className="grid gap-1.5">
        <Label>10 rows</Label>
        <Textarea placeholder="Long input..." rows={10} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Textareas with different row counts for varying content needs.",
      },
    },
  },
};
