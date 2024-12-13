import { defineConfig } from 'orval';

export default defineConfig({
  powerstation: {
    input: {
      target: './openapi.combined.yaml',
      validation: false
    },
    output: {
      mode: 'split',
      target: './src/api/generated/powerstation.ts',
      schemas: './src/api/generated/model',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
}); 