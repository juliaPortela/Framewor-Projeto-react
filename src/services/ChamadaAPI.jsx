const APIKEY = "8d56f75105db4a71a30b3f8b7502102d";
const APIKEY2 = "h8bkWKMl4NnSS7hPe2HPGk7qrBfBSxK1";

export const url = `https://api.rawg.io/api/games?key=${APIKEY}&page_size=6`;

export async function chamarAPI(url, setCarregando) {
  setCarregando(true);
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Erro:", error);
  } finally {
    setCarregando(false);
  }
}

export async function buscarGif(tipo) {
  const termo = tipo === "success" ? "celebration" : "crying";

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY2}&q=${termo}&limit=10`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      console.warn("Nenhum GIF encontrado");
      return null;
    }

    const gifs = data.data;

    const gifAleatorio = gifs[Math.floor(Math.random() * gifs.length)];

    return gifAleatorio.images.original.url;
  } catch (err) {
    console.error("Erro ao buscar gif", err);
    return null;
  }
  console.log(data);
}
