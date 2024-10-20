export function fetchProductApi() {
  const url = '/api/items/';

  return async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_HOST + url + id);

      if (!response.ok) {
        return rejectWithValue("Ошибка загрузки товара!");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("При загрузке товара не удалось подключиться к серверу.");
    }
  };
}
