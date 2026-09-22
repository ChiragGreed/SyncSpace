import { useCallback } from 'react'
import { generateTasksApi } from '../service/aiApi.js'

const useAI = () => {
    const generateTasks = useCallback(async (title, description) => {
        const response = await generateTasksApi(title, description)
        return response.tasks ?? []
    }, [])

    return { generateTasks }
}

export default useAI