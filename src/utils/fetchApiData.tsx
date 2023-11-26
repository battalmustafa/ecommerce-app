interface ApiResponse {
  data: any;
}

const fetchApiData = async (url: string): Promise<ApiResponse> => {
  try {
    const sessionId = 'ke94kw9f2';
    const headers = {
      'Content-Type': 'application/json',
      'session-id': sessionId,
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    return { data: result };
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }

  return { data: undefined };
};

export default fetchApiData;
