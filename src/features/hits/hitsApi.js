export function fetchHitsApi() {
  const url = '/api/top-sales';

  return async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_HOST + url);

      if (!response.ok) {
        return rejectWithValue("Ошибка загрузки хитов!");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("При загрузке хитов не удалось подключиться к серверу.");
    }
  };
}