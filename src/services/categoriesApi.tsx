import { api } from "./axiosApi";

export async function getCategories() {
    const { data } = await api.get('/categories');

    return data;
}

export async function createCategory(payload: { name: string; color: string }) {
    const { data } = await api.post('/categories', payload);
    return data;
}

export async function updateCategory(id: number, payload: Partial<{ name: string; color: string }>) {
    const { data } = await api.put(`/categories/${id}`, payload);
    return data;
}

export async function deleteCategory(id: number) {
    const { data } = await api.delete(`/categories/${id}`);
    return data;
}