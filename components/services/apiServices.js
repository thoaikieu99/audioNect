const baseUl = `https://kianai158.shop:4000/api/v1`;
const retuData = async (url) => {
  let topd = await fetch(url);
  let data = await topd.json();
  return data;
};

const getApiNewAudio = async (page) => {
  let dataUrl = await retuData(`${baseUl}/audios/new?page=${+page}`);
  return dataUrl;
};

const getfindsp = async (find, bol, page = "") => {
  if (page) {
    page = `&page=${+page}`;
  }
  let dataUrl = await retuData(
    `${baseUl}/audios/search?name=${find}&search=${bol}${page}`
  );
  return dataUrl;
};

const getfind = async (find, page) => {
  let dataUrl = await retuData(
    `${baseUl}/audios/search?page=${+page}&name=${find}&search=${bol}`
  );
  return dataUrl;
};

const getApiTheLoai = async () => {
  let dataUrl = await retuData(`${baseUl}/categories/show`);
  return dataUrl;
};
const getApiTop = async (type) => {
  let dataUrl = await retuData(`${baseUl}/countviews/top?type=${type}`);
  return dataUrl;
};

const getApiAddViews = (audio_id) => {
  return fetch(`${baseUl}/countviews/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ audio_id: audio_id }),
  });
};

const getApiNgheNhieu = async (page) => {
  let dataUrl = await retuData(`${baseUl}/countviews/nghe-nhieu?page=${+page}`);
  return dataUrl;
};

const getApiListTL = async (slug, page) => {
  let dataUrl = await retuData(`${baseUl}/categories/${slug}?page=${+page}`);
  return dataUrl;
};

const getOneAudio = async (slug) => {
  let dataUrl = await retuData(`${baseUl}/audios/${slug}`);
  return dataUrl;
};

const singUP = async (obj) => {
  const sing = await fetch(`${baseUl}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...obj }),
  });

  let data = await sing.json();
  return data;
};
const singIn = async (obj) => {
  const sing = await fetch(`${baseUl}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...obj }),
  });
  let data = await sing.json();
  return data;
};

const saveData = async (obj, token) => {
  const sing = await fetch(`${baseUl}/tu-truyen/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...obj }),
  });
  let data = await sing.json();
  return data;
};

const loadData = async (dataax, token) => {
  const sing = await fetch(`${baseUl}/tu-truyen/getone/${+dataax}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await sing.json();
  return data;
};

const themTTtr = async (obj, token) => {
  const sing = await fetch(`${baseUl}/tu-truyen`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...obj }),
  });
  let data = await sing.json();
  return data;
};
export {
  getApiNewAudio,
  getApiTheLoai,
  getApiNgheNhieu,
  getApiListTL,
  getApiTop,
  getOneAudio,
  getApiAddViews,
  getfindsp,
  getfind,
  singUP,
  singIn,
  saveData,
  loadData,
  themTTtr,
};
