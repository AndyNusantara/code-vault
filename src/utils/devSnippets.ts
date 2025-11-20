// utils/devSnippets.ts
import type { Snippet } from "@/types/snippet";

export const generateDevSnippets = (): Snippet[] => {
  const snippets: Snippet[] = [
    {
      id: "1",
      title: "Vue 3 Composition API Counter",
      code: `import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const double = computed(() => count.value * 2)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  return { count, double, increment, decrement, reset }
}`,
      language: "javascript",
      framework: "vue",
      stylingTool: "none",
      tags: ["composition-api", "counter", "reactivity", "javascript"],
      isFavorite: true,
      description: "A reusable counter using Vue 3 Composition API",
      createdAt: new Date("2024-01-15").toISOString(),
      updatedAt: new Date("2024-01-15").toISOString(),
    },
    {
      id: "2",
      title: "React Custom Hook - useLocalStorage",
      code: `import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}`,
      language: "javascript",
      framework: "reactjs",
      stylingTool: "none",
      tags: ["custom-hook", "localstorage", "state"],
      isFavorite: false,
      description: "A reusable counter using Vue 3 Composition API",
      createdAt: new Date("2024-01-14").toISOString(),
      updatedAt: new Date("2024-01-14").toISOString(),
    },
    {
      id: "3",
      title: "Tailwind CSS Card Component",
      code: `function Card({ title, description, imageUrl }) {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {title}
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
          Learn More
        </button>
      </div>
    </div>
  )
}`,
      language: "javascript",
      framework: "reactjs",
      stylingTool: "tailwind",
      tags: ["tailwind", "card", "component", "styling"],
      isFavorite: true,
      description: "A reusable counter using Vue 3 Composition API",
      createdAt: new Date("2024-01-16").toISOString(),
      updatedAt: new Date("2024-01-16").toISOString(),
    },
    {
      id: "4",
      title: "Vue 3 + Tailwind Modal Component",
      code: `<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>

      <!-- Modal -->
      <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ title }}
        </h3>
        <div class="text-gray-600 dark:text-gray-300 mb-6">
          <slot></slot>
        </div>
        <div class="flex justify-end gap-3">
          <button
            @click="$emit('close')"
            class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String
})

defineEmits(['close', 'confirm'])
</script>`,
      language: "javascript",
      framework: "vue",
      stylingTool: "tailwind",
      tags: ["modal", "tailwind", "vue3", "component"],
      isFavorite: true,
      description: "A reusable counter using Vue 3 Composition API",
      createdAt: new Date("2024-01-17").toISOString(),
      updatedAt: new Date("2024-01-17").toISOString(),
    },
    {
      id: "5",
      title: "CSS Grid Layout with SCSS",
      code: `// Grid system using SCSS
@use 'sass:math';

$grid-columns: 12;
$grid-gap: 1rem;

.grid {
  display: grid;
  grid-template-columns: repeat($grid-columns, 1fr);
  gap: $grid-gap;
  width: 100%;
}

@for $i from 1 through $grid-columns {
  .col-#{$i} {
    grid-column: span $i;
  }
}

// Responsive grid
@mixin responsive-grid($breakpoint) {
  @for $i from 1 through $grid-columns {
    .col-#{$breakpoint}-#{$i} {
      grid-column: span $i;
    }
  }
}

// Media queries
@media (max-width: 768px) {
  @include responsive-grid('sm');
}

@media (max-width: 1024px) {
  @include responsive-grid('md');
}

// Usage example:
// <div class="grid">
//   <div class="col-12 col-md-6 col-lg-4">Content</div>
// </div>`,
      language: "scss",
      framework: "none",
      stylingTool: "sass",
      tags: ["scss", "grid", "layout", "responsive", "mixins"],
      isFavorite: false,
      description: "A reusable counter using Vue 3 Composition API",
      createdAt: new Date("2024-01-13").toISOString(),
      updatedAt: new Date("2024-01-13").toISOString(),
    },
    {
      id: "6",
      title: "TypeScript + React API Hook",
      code: `import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage:
// const { data, loading, error } = useApi<User[]>('/api/users');`,
      language: "typescript",
      framework: "reactjs",
      stylingTool: "none",
      tags: ["typescript", "react", "api", "custom-hook"],
      isFavorite: true,
      description: "A reusable counter using Vue 3 Composition API",
      createdAt: new Date("2024-01-18").toISOString(),
      updatedAt: new Date("2024-01-18").toISOString(),
    },
    {
      id: "7",
      title: "Styled Components Button Variants",
      code: `import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>\`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  // Size variants
  \${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return css\`
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        \`;
      case 'large':
        return css\`
          padding: 1rem 2rem;
          font-size: 1.125rem;
        \`;
      default:
        return css\`
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        \`;
    }
  }}

  // Color variants
  \${({ variant = 'primary', disabled }) => {
    if (disabled) {
      return css\`
        background-color: #6b7280;
        color: #9ca3af;
        cursor: not-allowed;
        opacity: 0.6;
      \`;
    }

    switch (variant) {
      case 'secondary':
        return css\`
          background-color: #f3f4f6;
          color: #374151;
          &:hover {
            background-color: #e5e7eb;
          }
        \`;
      case 'danger':
        return css\`
          background-color: #ef4444;
          color: white;
          &:hover {
            background-color: #dc2626;
          }
        \`;
      default:
        return css\`
          background-color: #3b82f6;
          color: white;
          &:hover {
            background-color: #2563eb;
          }
        \`;
    }
  }}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
\`;

export default Button;`,
      language: "typescript",
      framework: "reactjs",
      stylingTool: "styled-components",
      tags: ["styled-components", "button", "typescript", "react"],
      isFavorite: false,
      description: "A reusable counter using Vue 3 Composition API",
      createdAt: new Date("2024-01-19").toISOString(),
      updatedAt: new Date("2024-01-19").toISOString(),
    },
    {
      id: "8",
      title: "Python Flask REST API",
      code: `from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# In-memory storage for demo
snippets = []

class Snippet:
    def __init__(self, title, code, language, tags=None):
        self.id = len(snippets) + 1
        self.title = title
        self.code = code
        self.language = language
        self.tags = tags or []
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'code': self.code,
            'language': self.language,
            'tags': self.tags,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

@app.route('/api/snippets', methods=['GET'])
def get_snippets():
    return jsonify([snippet.to_dict() for snippet in snippets])

@app.route('/api/snippets', methods=['POST'])
def create_snippet():
    data = request.get_json()

    if not data or not data.get('title') or not data.get('code'):
        return jsonify({'error': 'Title and code are required'}), 400

    snippet = Snippet(
        title=data['title'],
        code=data['code'],
        language=data.get('language', 'python'),
        tags=data.get('tags', [])
    )

    snippets.append(snippet)
    return jsonify(snippet.to_dict()), 201

@app.route('/api/snippets/<int:snippet_id>', methods=['GET'])
def get_snippet(snippet_id):
    snippet = next((s for s in snippets if s.id == snippet_id), None)
    if not snippet:
        return jsonify({'error': 'Snippet not found'}), 404
    return jsonify(snippet.to_dict())

if __name__ == '__main__':
    app.run(debug=True)`,
      language: "python",
      framework: "flask",
      stylingTool: "none",
      tags: ["python", "flask", "api", "rest", "backend"],
      isFavorite: true,
      description: "A reusable counter using Vue 3 Composition API",
      createdAt: new Date("2024-01-20").toISOString(),
      updatedAt: new Date("2024-01-20").toISOString(),
    },
    {
      id: "9",
      title: "Pure CSS Loading Spinner",
      code: `/* CSS-only loading spinner with multiple variants */
.spinner {
  border: 3px solid #f3f4f6;
  border-radius: 50%;
  border-top: 3px solid #3b82f6;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.spinner.large {
  width: 60px;
  height: 60px;
  border-width: 4px;
}

.spinner.danger {
  border-top-color: #ef4444;
}

.spinner.success {
  border-top-color: #10b981;
}

.spinner.pulse {
  animation: spin-pulse 1.5s ease-in-out infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spin-pulse {
  0%, 100% {
    transform: rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.5;
  }
}

/* Dots loading animation */
.dots-loading {
  display: inline-flex;
  gap: 4px;
}

.dots-loading div {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #3b82f6;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dots-loading div:nth-child(1) { animation-delay: -0.32s; }
.dots-loading div:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1);
  }
}`,
      language: "css",
      framework: "none",
      stylingTool: "none",
      tags: ["css", "animation", "loading", "spinner"],
      isFavorite: false,
      description: "A reusable counter using Vue 3 Composition API",
      createdAt: new Date("2024-01-21").toISOString(),
      updatedAt: new Date("2024-01-21").toISOString(),
    },
    {
      id: "10",
      title: "Next.js API Route with TypeScript",
      code: `import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Check authentication
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized'
    })
  }

  try {
    switch (req.method) {
      case 'GET':
        const snippets = await fetchSnippets(session.user.id)
        return res.status(200).json({
          success: true,
          data: snippets
        })

      case 'POST':
        const { title, code, language, tags } = req.body

        if (!title || !code) {
          return res.status(400).json({
            success: false,
            error: 'Title and code are required'
          })
        }

        const newSnippet = await createSnippet({
          title,
          code,
          language: language || 'javascript',
          tags: tags || [],
          userId: session.user.id
        })

        return res.status(201).json({
          success: true,
          data: newSnippet
        })

      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).json({
          success: false,
          error: \`Method \${req.method} Not Allowed\`
        })
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    })
  }
}`,
      language: "typescript",
      framework: "nextjs",
      stylingTool: "none",
      tags: ["nextjs", "api", "typescript", "authentication"],
      isFavorite: true,
      description: "A reusable counter using Vue 3 Composition API",
      createdAt: new Date("2024-01-22").toISOString(),
      updatedAt: new Date("2024-01-22").toISOString(),
    },
  ];

  return snippets;
};
