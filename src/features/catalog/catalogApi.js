export function fetchCatalogCategoriesApi() {
  const url = '/api/categories';

  return async (_, { rejectWithValue }) => {
    try {
      const host = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;
      const response = await fetch(host + url);

      if (!response.ok) {
        return rejectWithValue("Ошибка загрузки категорий каталога!");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("При загрузке категорий каталога не удалось подключиться к серверу.");
    }
  };
}

export function fetchCatalogItemsApi() {
  const url = '/api/items';

  return async (params, { rejectWithValue }) => {
    try {
      let newUrl;
      if (params instanceof Object) {
        newUrl = url + '?';
        for (let param in params) {
          if (params[param]) {
            newUrl += param + '=' + params[param] + '&';
          }
        }
      } else {
        newUrl = url;
      }

      const host = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;
      const response = await fetch(host + newUrl);

      if (!response.ok) {
        return rejectWithValue("Ошибка загрузки элементов каталога!");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("При загрузке элементов каталога не удалось подключиться к серверу.");
    }
  };
}
