"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Undo,
  Redo,
} from "lucide-react"

interface RichTextEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className,
}: RichTextEditorProps) {
  const [content, setContent] = useState(value)
  const [isFormatting, setIsFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
  })

  const handleCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)

    // Update formatting state
    setIsFormatting({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    })
  }, [])

  const handleContentChange = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const newContent = e.currentTarget.innerHTML
      setContent(newContent)
      onChange?.(newContent)
    },
    [onChange],
  )

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:")
    if (url) {
      handleCommand("createLink", url)
    }
  }, [handleCommand])

  const insertImage = useCallback(() => {
    const url = prompt("Enter image URL:")
    if (url) {
      handleCommand("insertImage", url)
    }
  }, [handleCommand])

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Product Description</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-1">
            <Toggle
              pressed={isFormatting.bold}
              onPressedChange={() => handleCommand("bold")}
              size="sm"
              aria-label="Bold"
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={isFormatting.italic}
              onPressedChange={() => handleCommand("italic")}
              size="sm"
              aria-label="Italic"
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={isFormatting.underline}
              onPressedChange={() => handleCommand("underline")}
              size="sm"
              aria-label="Underline"
            >
              <Underline className="h-4 w-4" />
            </Toggle>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => handleCommand("insertUnorderedList")}>
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleCommand("insertOrderedList")}>
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => handleCommand("justifyLeft")}>
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleCommand("justifyCenter")}>
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleCommand("justifyRight")}>
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={insertLink}>
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={insertImage}>
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleCommand("formatBlock", "blockquote")}>
              <Quote className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleCommand("formatBlock", "pre")}>
              <Code className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => handleCommand("undo")}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleCommand("redo")}>
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Editor */}
        <div
          contentEditable
          className="min-h-[200px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent prose prose-sm max-w-none"
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: content }}
          data-placeholder={placeholder}
          style={
            {
              "--placeholder-color": "hsl(var(--muted-foreground))",
            } as React.CSSProperties
          }
        />

        <style jsx>{`
          [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: var(--placeholder-color);
            pointer-events: none;
          }
        `}</style>
      </CardContent>
    </Card>
  )
}
