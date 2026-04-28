import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Input } from '../input/input'
import { Field } from './field'

describe('Field', () => {
  it('connects label to a child input via generated id', () => {
    render(
      <Field label="Job title">
        <Input placeholder="Product manager" />
      </Field>,
    )

    const input = screen.getByLabelText('Job title')

    expect(input.tagName).toBe('INPUT')
    expect((input as HTMLInputElement).placeholder).toBe('Product manager')
  })

  it('preserves a child input id when one is provided', () => {
    render(
      <Field label="Job title">
        <Input id="explicit-id" placeholder="Product manager" />
      </Field>,
    )

    const input = screen.getByPlaceholderText('Product manager')

    expect(input.id).toBe('explicit-id')
  })

  it('renders hint text when no error is set', () => {
    render(
      <Field hint="Use the role title from the job posting" label="Job title">
        <Input placeholder="Product manager" />
      </Field>,
    )

    const helper = screen.getByText('Use the role title from the job posting')

    expect(helper.className).toContain('text-ink-700')
  })

  it('renders error text and danger tone when error is set', () => {
    render(
      <Field
        error="Job title is required"
        hint="Use the role title from the job posting"
        label="Job title"
      >
        <Input invalid placeholder="Product manager" />
      </Field>,
    )

    const helper = screen.getByText('Job title is required')

    expect(helper.className).toContain('text-danger-700')
    expect(
      screen.queryByText('Use the role title from the job posting'),
    ).toBeNull()
  })

  it('renders a counter alongside the helper text', () => {
    render(
      <Field counter="14/60" label="Job title">
        <Input defaultValue="Product manager" />
      </Field>,
    )

    expect(screen.getByText('14/60')).toBeDefined()
  })

  it('marks the counter as danger when invalid is set without an error', () => {
    render(
      <Field counter="1290/1200" invalid label="Additional details">
        <Input defaultValue="..." invalid />
      </Field>,
    )

    const counter = screen.getByText('1290/1200')

    expect(counter.className).toContain('text-danger-700')
  })
})
