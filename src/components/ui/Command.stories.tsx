import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "./command";
import { Button } from "./button";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  User,
  Smile,
  Search,
  FileText,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Command> = {
  title: "UI/Command",
  component: Command,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A command palette component for quick actions and search. Built on cmdk library.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[350px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithSearch: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[350px]">
      <CommandInput placeholder="Search documents..." />
      <CommandList>
        <CommandEmpty>No documents found.</CommandEmpty>
        <CommandGroup heading="Recent Documents">
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Project Proposal.docx</span>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Meeting Notes.md</span>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Budget 2024.xlsx</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Shared with me">
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Design Guidelines.pdf</span>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Brand Assets.zip</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story: "Command menu configured as a document search interface.",
      },
    },
  },
};

export const Navigation: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[350px]">
      <CommandInput placeholder="Go to..." />
      <CommandList>
        <CommandEmpty>No pages found.</CommandEmpty>
        <CommandGroup heading="Quick Navigation">
          <CommandItem>
            <span className="mr-2">🏠</span>
            <span>Home</span>
            <CommandShortcut>G H</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="mr-2">📊</span>
            <span>Dashboard</span>
            <CommandShortcut>G D</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="mr-2">📁</span>
            <span>Projects</span>
            <CommandShortcut>G P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="mr-2">⚙️</span>
            <span>Settings</span>
            <CommandShortcut>G S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story: "Command menu for quick page navigation.",
      },
    },
  },
};

const DialogDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="justify-between w-[250px]"
      >
        <span className="flex items-center">
          <Search className="mr-2 h-4 w-4" />
          Search...
        </span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => setOpen(false)}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Compose Email</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>New Message</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <FileText className="mr-2 h-4 w-4" />
              <span>New Document</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => setOpen(false)}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export const AsDialog: Story = {
  render: () => <DialogDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Command menu as a modal dialog, commonly triggered by ⌘K or a search button.",
      },
    },
  },
};

export const UserSearch: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[350px]">
      <CommandInput placeholder="Search users..." />
      <CommandList>
        <CommandEmpty>No users found.</CommandEmpty>
        <CommandGroup heading="Team Members">
          <CommandItem>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-muted mr-2 flex items-center justify-center text-xs font-medium">
                JD
              </div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
          </CommandItem>
          <CommandItem>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-muted mr-2 flex items-center justify-center text-xs font-medium">
                JS
              </div>
              <div>
                <p className="text-sm font-medium">Jane Smith</p>
                <p className="text-xs text-muted-foreground">jane@example.com</p>
              </div>
            </div>
          </CommandItem>
          <CommandItem>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-muted mr-2 flex items-center justify-center text-xs font-medium">
                BJ
              </div>
              <div>
                <p className="text-sm font-medium">Bob Johnson</p>
                <p className="text-xs text-muted-foreground">bob@example.com</p>
              </div>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story: "Command menu for searching and selecting users.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[350px]">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Create Document</span>
          </CommandItem>
          <CommandItem disabled>
            <Mail className="mr-2 h-4 w-4" />
            <span>Send Email (Coming Soon)</span>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story: "Command menu with a disabled item.",
      },
    },
  },
};
