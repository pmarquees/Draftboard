import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from "./toast";
import { Button } from "./button";
import { useState } from "react";

const meta: Meta<typeof Toast> = {
  title: "UI/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toast notification component for displaying brief messages. Built on Radix UI Toast.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Static toast examples (not interactive)
export const Default: Story = {
  render: () => (
    <div className="relative w-[380px]">
      <div className="pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg bg-background">
        <div className="grid gap-1">
          <div className="text-sm font-semibold">Scheduled: Catch up</div>
          <div className="text-sm opacity-90">
            Friday, February 10, 2024 at 5:57 PM
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[380px]">
      <div className="pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg bg-background">
        <div className="grid gap-1">
          <div className="text-sm font-semibold">Default Toast</div>
          <div className="text-sm opacity-90">
            This is a default toast notification.
          </div>
        </div>
      </div>

      <div className="pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border-destructive bg-destructive text-destructive-foreground p-4 pr-6 shadow-lg">
        <div className="grid gap-1">
          <div className="text-sm font-semibold">Destructive Toast</div>
          <div className="text-sm opacity-90">
            Something went wrong. Please try again.
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toast variants for different message types - default and destructive.",
      },
    },
  },
};

export const WithAction: Story = {
  render: () => (
    <div className="w-[380px]">
      <div className="pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg bg-background">
        <div className="grid gap-1">
          <div className="text-sm font-semibold">Item deleted</div>
          <div className="text-sm opacity-90">
            The item has been moved to trash.
          </div>
        </div>
        <Button variant="outline" size="sm" className="shrink-0">
          Undo
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toast with an action button for undo or other quick actions.",
      },
    },
  },
};

export const SuccessMessage: Story = {
  render: () => (
    <div className="w-[380px]">
      <div className="pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border border-green-200 bg-green-50 text-green-900 p-4 pr-6 shadow-lg dark:border-green-800 dark:bg-green-950 dark:text-green-100">
        <div className="grid gap-1">
          <div className="text-sm font-semibold">Success!</div>
          <div className="text-sm opacity-90">
            Your changes have been saved successfully.
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Custom styled success toast using Tailwind classes.",
      },
    },
  },
};

export const TitleOnly: Story = {
  render: () => (
    <div className="w-[380px]">
      <div className="pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg bg-background">
        <div className="text-sm font-semibold">Copied to clipboard!</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple toast with just a title for quick confirmations.",
      },
    },
  },
};

// Interactive demo
const ToastDemo = () => {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<"default" | "destructive">("default");

  return (
    <ToastProvider>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setVariant("default");
            setOpen(true);
          }}
        >
          Show Toast
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            setVariant("destructive");
            setOpen(true);
          }}
        >
          Show Error
        </Button>
      </div>

      <Toast open={open} onOpenChange={setOpen} variant={variant}>
        <div className="grid gap-1">
          <ToastTitle>
            {variant === "default" ? "Notification" : "Error"}
          </ToastTitle>
          <ToastDescription>
            {variant === "default"
              ? "Your action was completed successfully."
              : "Something went wrong. Please try again."}
          </ToastDescription>
        </div>
        <ToastClose />
      </Toast>

      <ToastViewport />
    </ToastProvider>
  );
};

export const Interactive: Story = {
  render: () => <ToastDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo showing how to trigger toasts programmatically. Click the buttons to show different toast types.",
      },
    },
  },
};

export const UsageExample: Story = {
  render: () => (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg max-w-md">
      <h4 className="font-medium">Using Toasts in Your App</h4>
      <p className="text-sm text-muted-foreground">
        Draftboard uses a toast hook pattern for triggering notifications. Import and use it like this:
      </p>
      <pre className="p-3 bg-background rounded text-xs overflow-x-auto">
{`import { useToast } from "~/components/ui/use-toast"

function MyComponent() {
  const { toast } = useToast()

  return (
    <Button onClick={() => {
      toast({
        title: "Saved!",
        description: "Your changes have been saved.",
      })
    }}>
      Save
    </Button>
  )
}`}
      </pre>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Code example showing how to use the toast system in your components.",
      },
    },
  },
};
