import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const root = process.cwd()

function read(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8')
}

function exists(relativePath) {
  return existsSync(join(root, relativePath))
}

function regexFor(value) {
  return new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
}

test('repository exposes a complete local quality contract', () => {
  const manifest = JSON.parse(read('package.json'))

  for (const script of [
    'lint',
    'typecheck',
    'test',
    'test:frontend-contract',
    'test:backend',
    'validate:backend',
    'quality',
    'build',
  ]) {
    assert.ok(manifest.scripts[script], `missing quality script: ${script}`)
  }
})

test('public application surfaces and environment safety template are present', () => {
  for (const relativePath of [
    'src/frontend/App.tsx',
    'src/backend/main.py',
    'src/backend/tests/test_api_smoke.py',
    'scripts/validate_backend_contract.py',
    '.env.example',
  ]) {
    assert.ok(exists(relativePath), `missing application or environment file: ${relativePath}`)
  }

  const environmentTemplate = read('.env.example')
  assert.match(environmentTemplate, /^VITE_MONEYFLOW_API_URL=http:\/\/127\.0\.0\.1:8000$/m)
  assert.match(environmentTemplate, /Never place API keys, bank credentials, access tokens, or other secrets in VITE_\* variables/)
})

test('README explains purpose, setup, use cases, support, and validation', () => {
  const readme = read('README.md')

  for (const heading of [
    '## Why this exists',
    '## Verified Setup',
    '## Use Cases',
    '## Support',
    'npm run quality',
  ]) {
    assert.match(readme, regexFor(heading))
  }
})

test('community health and CI quality gates are present', () => {
  for (const relativePath of [
    'CODE_OF_CONDUCT.md',
    'CONTRIBUTING.md',
    'SECURITY.md',
    'SUPPORT.md',
    'FORK_POLICY.md',
    '.github/CODEOWNERS',
    '.github/workflows/quality.yml',
  ]) {
    assert.ok(exists(relativePath), `missing policy or automation file: ${relativePath}`)
  }

  const workflow = read('.github/workflows/quality.yml')
  for (const command of [
    'npm run lint',
    'npm run typecheck',
    'npm run test:frontend-contract',
    'npm run test:backend',
    'npm run validate:backend',
    'npm run build',
  ]) {
    assert.match(workflow, regexFor(command))
  }
})
