export interface ApiResponse {
    data: any;
  }
  
  interface RequestOptions {
    headers?: Record<string, string>;
    body?: Record<string, any>;
  }
  
  const postRequest = async (
    url: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse> => {
    try {
      const { headers = {}, body } = options;
  
      const sessionId = 'ke94kw9f2';
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'session-id': sessionId,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result: ApiResponse = await response.json();
  
      return result;
    } catch (error) {
      // Handle error appropriately (e.g., log or throw a custom error)
      throw new Error(`Failed to make the POST request: ${error}`);
    }
  };
  
  export default postRequest;
  