import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import { Search, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A basic text input component with consistent styling. Supports all native input types and states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
      description: "The type of input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="name@example.com" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Input field with an associated label for accessibility.",
      },
    },
  },
};

export const InputTypes: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="text">Text</Label>
        <Input type="text" id="text" placeholder="Enter text" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="name@example.com" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Enter password" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="number">Number</Label>
        <Input type="number" id="number" placeholder="0" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different input types for various data entry scenarios.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-4">
      <Input placeholder="Disabled input" disabled />
      <Input value="Disabled with value" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled inputs cannot be interacted with.",
      },
    },
  },
};

export const WithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm gap-2">
      <Input type="email" placeholder="Enter your email" />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Input combined with a button for form submission.",
      },
    },
  },
};

export const SearchInput: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="search" placeholder="Search..." className="pl-10" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Search input with an icon prefix.",
      },
    },
  },
};

const PasswordInputDemo = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="relative w-full max-w-sm">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export const PasswordToggle: Story = {
  render: () => <PasswordInputDemo />,
  parameters: {
    docs: {
      description: {
        story: "Password input with show/hide toggle functionality.",
      },
    },
  },
};

export const File: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="file">Upload file</Label>
      <Input id="file" type="file" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "File input with styled file button.",
      },
    },
  },
};
