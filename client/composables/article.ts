import axios from "axios";
import { apiBase } from "~/constants";
import type Article from "~/types/article";
const baseUrl = "http://89.111.173.105:3001/api/articles";

export async function fetchArticleById(
  id: string | string[],
): Promise<Article | undefined> {
  const { data } = await useAsyncData<Article>(() =>
    $fetch(`${baseUrl}/id/${id}`),
  );
  if (data.value) {
    return data.value;
  } else {
    return undefined;
  }
}

export async function searchArticlesByQuery(
  query: any,
  take?: string,
): Promise<Article[] | undefined> {
  const articles = await $fetch<Article[]>(
    `${baseUrl}/tags?tag=${query}&take=${take}`,
  );
  if (articles) {
    return articles;
  } else {
    return undefined;
  }
}

export async function getLatestArticles(
  from: number,
): Promise<Article[] | undefined> {
  const articles = await $fetch<Article[]>(`${baseUrl}/latest?from=${from}`);
  if (articles && articles.length > 0) {
    return articles;
  } else {
    return undefined;
  }
}

export async function searchArticlesByTitleOrTag(
  query: any,
): Promise<Article[] | undefined> {
  const articles = await $fetch<Article[]>(`${baseUrl}/search?text=${query.text}`);
  return articles || undefined;
}

export async function getRecommended(
  text: string,
): Promise<Article[] | undefined> {
  return (
    (await $fetch<Article[]>(`${baseUrl}/recommended?text=${text}`)) ||
    undefined
  );
}



export const deleteArticle = async (article_id: string): Promise<any> => {
  try {
    const req = await axios.delete(`${apiBase}/articles/delete/${article_id}`,{
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    return req.status;

  } catch(e: any) {
    console.log("Error: ", e);
    return null;
  } 
};

export const isArticleBelongsToAuthor = async (author_id: number, article_id: string): Promise<boolean> => {
  try {
    const req = await axios.get<Promise<boolean>>(`${apiBase}/articles/author/${author_id}/article/${article_id}`,
      {
        withCredentials: true,
      }
    );
    return req.data;
  } catch(e) {
    return false;
  }
}

export const editArticle = async (article_id: string, formdata: FormData): Promise<any> => {
  try {
    // const req = await axios.put(`${apiBase}/articles/edit/${article_id}`, formdata, {
    //   withCredentials: true
    // });
    const req = await $fetch(`${apiBase}/articles/edit/${article_id}`, {
      method: "PUT",
      body: formdata,
      credentials: 'include'
    })
    console.log(req);
  } catch(e) {
    console.log("Error: ", e);
  }
}