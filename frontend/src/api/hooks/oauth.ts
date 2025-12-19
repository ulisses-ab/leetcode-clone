import { api } from "../api";

export function useOAuth() {
  async function google() {
    const location = window.location.href;
    const state = encodeURIComponent(JSON.stringify({
      returnURL: location
    }));

    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google?state=${state}`;
  }

  return { google };
}