export function fetchCatalogCategoriesApi() {
  const url = '/api/categories';

  return async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_HOST + url);

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

      const response = await fetch(process.env.REACT_APP_API_HOST + newUrl);

      if (!response.ok) {
        return rejectWithValue("Ошибка загрузки элементов каталога!");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("При загрузке элементов каталога не удалось подключиться к серверу.");
    }
  };
}
