import { describe, it, expect } from "vitest";
import { server } from "../../../tests/server";
import {http, HttpResponse} from 'msw'
import { env } from "../../../config/env";
import { renderHook,waitFor } from "@testing-library/react";
import { useTask, useTasks } from "../hooks/useTaskQueries";
import { wrapper } from "../../../tests/renderWithProviders";


const baseURL = env.apiBaseUrl

const mockTask = {
  id: '1',
  title: 'Fix bug',
  details: 'Some details',
  projectId: 'project-1',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  status: 'open'
}

describe('useTask', ()=>{
    it('returns task data on success', async()=> {
        server.use(
            http.get(`${baseURL}/projects/:projectId/tasks/:id`, ()=>{
                return HttpResponse.json(mockTask)
            })
        )

        const {result} = renderHook(()=>useTask('project-1', '1'),{wrapper})

        await waitFor(()=>expect(result.current.isSuccess).toBe(true))
    })

    it('does not fetch if taskID is undefined', ()=>{
        const {result} = renderHook(()=>useTask('project-1', undefined),{wrapper})
        expect(result.current.isLoading).toBe(false)
        expect(result.current.fetchStatus).toBe('idle')
    })

    it('does not fetch if projectId is undefined', ()=>{
        const {result} = renderHook(()=>useTask(undefined, '1'),{wrapper})
        expect(result.current.isLoading).toBe(false)
        expect(result.current.fetchStatus).toBe('idle')
    })

    it('is in error state when request fails', async () => {
    server.use(
      http.get(`${baseURL}/projects/:projectId/tasks/:id`, () => {
        return new HttpResponse(null, { status: 404 })
      })
    )

      const { result } = renderHook(() => useTask('project-1', '1'), { wrapper })

      await waitFor(() => expect(result.current.isError).toBe(true))
  })

  it('fetches with correct task id', async () => {
    let capturedId: string | undefined

    server.use(
        http.get(`${baseURL}/projects/:projectId/tasks/:id`, ({ params }) => {
            capturedId = params.id as string
        return HttpResponse.json(mockTask)
        })
    )

    const { result } = renderHook(() => useTask('project-1', '1'), { wrapper })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(capturedId).toBe('1')
  })

})
