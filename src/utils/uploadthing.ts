import { generateReactNativeHelpers } from "@uploadthing/expo";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:3000/api/uploadthing"
    : "http://10.0.2.2:3000/api/uploadthing"; // Android emulator, adjust for device

export const { useImageUploader, useDocumentUploader } =
  generateReactNativeHelpers({
    url: BASE_URL,

    fetch: async (input, init) => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : (input as Request).url;

      console.log(`[UT] [${init?.method || "GET"}] -> ${url.split("?")[0]}`);

      // Only intercept S3 PUT uploads (strip internal headers that S3 rejects)
      const isS3Put =
        url.includes("ingest.uploadthing.com") &&
        init?.method?.toUpperCase() === "PUT";

      if (isS3Put) {
        console.log("[UT] SANITIZING S3 UPLOAD REQUEST");
        // S3 presigned URLs are very sensitive to headers.
        // We must strip any headers that weren't part of the signing process.
        const h = new Headers(init?.headers);

        // Keep ONLY essential headers that might have been signed.
        // Usually, only Content-Type and perhaps some x-amz headers are signed.
        // Stripping everything else is safer.
        const headersToKeep = ["content-type", "content-length"];
        const entries = Array.from(h.entries());
        
        entries.forEach(([key]) => {
          if (!headersToKeep.includes(key.toLowerCase()) && !key.toLowerCase().startsWith("x-amz-")) {
            console.log(`[UT] Stripping header from S3 request: ${key}`);
            h.delete(key);
          }
        });

        console.log("[UT] Cleaned S3 Headers:", Object.fromEntries(h.entries()));

        let body = init?.body;

        // For Native (iOS/Android), we need to send the file as a Blob/File, not FormData
        if (Platform.OS !== "web" && body instanceof FormData) {
          try {
            const file = body.get("file") as any;
            if (file?.uri) {
              body = await fetch(file.uri).then((r) => r.blob());
              console.log("[UT] Successfully converted FormData to Blob for Native S3 upload");
            }
          } catch (err) {
            console.error("[UT] S3 blob conversion failed:", err);
          }
        }

        return fetch(input, { ...init, headers: h, body });
      }

      return fetch(input, init);
    },
  });
