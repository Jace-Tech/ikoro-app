import { useEffect, useState } from "react"


interface IuseFetch {
  isLoading: boolean;
  canCancel: boolean;
  error: string | null;
  data: any;
  abortRequest?: () => void;
  makeRequest: () => Promise<void>;
}
const useFetch = (req: (...args: any[]) => Promise<ResponseDataType>): IuseFetch => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [canCancel, setCanCancel] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)
  const [abortRequest, setAbortRequest] = useState<() => void>()

  useEffect(() => {
    if (abortRequest) setCanCancel(true)
    else setCanCancel(false)
  }, [abortRequest])

  const makeRequest = async ( ...args: any[]) => {
    try {
      // CANCEL PREV REQUEST IF ANY 
      if(abortRequest) abortRequest()
      const { signal, abort } = new AbortController()
      // UPDATE ERROR STATE
      setError(null)
      // UPDATE RESULT STATE
      setData(null)
      // UPDATE LOADING STATE
      setIsLoading(true)
      // UPDATE ABOUT
      setAbortRequest(abort)
      // MAKE REQUEST
      const result = await req(...args, signal)
      // CHECK ERROR
      if (!result.success) throw new Error(result.message)
      // UPDATE RESULT
      setData(result.data)
    }
    catch (error: any) {
      setError(error.message)
    }
    finally {  
      // UPDATE LOADING STATE
      setIsLoading(false)
      // UPDATE ABOUT
      setAbortRequest(undefined)
    }

  }

  return {
    isLoading, 
    data, 
    canCancel,
    abortRequest,
    error,
    makeRequest
  }
}

export default useFetch