import { describe, it, expect } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '../../../tests/server'
import { useCreateTask, useUpdateTaskStatus, useDeleteTask } from '../hooks/useTaskMutations'
import { wrapper } from '../../../tests/renderWithProviders'
import { env } from '../../../config/env'

const BASE = env.apiBaseUrl

const mockTask = {
  id: '1',
  title: 'Fix bug',
  details: 'Some details',
  projectId: 'project-1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  status: 'DONE'
}

describe('useCreateTask', () => {
  it('calls correct endpoint with correct projectId', async () => {
    let capturedProjectId: string | undefined

    server.use(
      http.post(`${BASE}/projects/:projectId/tasks`, ({ params }) => {
        capturedProjectId = params.projectId as string
        return HttpResponse.json(mockTask)
      })
    )

    const { result } = renderHook(() => useCreateTask(), { wrapper })

    act(() => {
      result.current.mutate({ projectId: 'project-1', data: { title: 'Fix bug' } })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(capturedProjectId).toBe('project-1')
  })

  it('is in error state when request fails', async () => {
    server.use(
      http.post(`${BASE}/projects/:projectId/tasks`, () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    const { result } = renderHook(() => useCreateTask(), { wrapper })

    act(() => {
      result.current.mutate({ projectId: 'project-1', data: { title: 'Fix bug' } })
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})

describe('useUpdateTaskStatus', () => {
  it('calls correct endpoint with correct task id', async () => {
    let capturedId: string | undefined

    server.use(
      http.put(`${BASE}/projects/:projectId/tasks/:id`, ({ params }) => {
        capturedId = params.id as string
        return HttpResponse.json(mockTask)
      })
    )

    const { result } = renderHook(() => useUpdateTaskStatus(), { wrapper })

    act(() => {
      result.current.mutate({ id: '1', projectId: 'project-1', status: 'IN_PROGRESS' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(capturedId).toBe('1')
  })

  it('is in error state when request fails', async () => {
    server.use(
      http.put(`${BASE}/projects/:projectId/tasks/:id`, () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    const { result } = renderHook(() => useUpdateTaskStatus(), { wrapper })

    act(() => {
      result.current.mutate({ id: '1', projectId: 'project-1', status: 'IN_PROGRESS' })
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})

describe('useDeleteTask', () => {
  it('calls correct endpoint with correct task id', async () => {
    let capturedId: string | undefined

    server.use(
      http.delete(`${BASE}/projects/:projectId/tasks/:id`, ({ params }) => {
        capturedId = params.id as string
        return new HttpResponse(null, { status: 204 })
      })
    )

    const { result } = renderHook(() => useDeleteTask(), { wrapper })

    act(() => {
      result.current.mutate({ id: '1', projectId: 'project-1' })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(capturedId).toBe('1')
  })

  it('is in error state when request fails', async () => {
    server.use(
      http.delete(`${BASE}/projects/:projectId/tasks/:id`, () => {
        return new HttpResponse(null, { status: 500 })
      })
    )

    const { result } = renderHook(() => useDeleteTask(), { wrapper })

    act(() => {
      result.current.mutate({ id: '1', projectId: 'project-1' })
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})