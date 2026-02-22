import { Editor as Monaco } from "@monaco-editor/react";
import React from "react";

export enum Language {
    JAVASCRIPT = "javascript", 
    JAVA = "java", 
    CPP = "cpp", 
    PYTHON = "python",
    TYPESCRIPT = "typescript"
}

interface EditorProps {
    language: string;
    theme: string;
    suggestion: boolean;
    intellisense: boolean;
    value: string;
    onValChange: (value: string | undefined) => void;
}   

export const Editor = ({ language, theme, suggestion, intellisense, value, onValChange }: EditorProps) => {
    return (
        <Monaco 
            language={language}
            theme={theme}
            value={value}
            onChange={(val) => onValChange(val)}
            width={"100%"}
            height={"100%"}
            options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                roundedSelection: true,
                cursorSmoothCaretAnimation: "on",
                cursorBlinking: "smooth",
                smoothScrolling: true,
                padding: { top: 16, bottom: 16 },
                suggestOnTriggerCharacters: suggestion,
                quickSuggestions: intellisense,
                parameterHints: { enabled: intellisense },
                snippetSuggestions: suggestion ? "inline" : "none",
                wordBasedSuggestions: "currentDocument",
                fontLigatures: true,
            }}
            className="pt-2 rounded-2xl"
        />      
    );
};
