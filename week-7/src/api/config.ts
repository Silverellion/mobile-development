import { Platform } from "react-native";
import Constants from "expo-constants";
const API_PORT = 3000;
function resolveHost(): string {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) return hostUri.split(":")[0];
  return Platform.OS === "android" ? "10.0.2.2" : "localhost"; 
}
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${resolveHost()}:${API_PORT}`;
