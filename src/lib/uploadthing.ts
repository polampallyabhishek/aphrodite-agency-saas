import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
  generateReactHelpers,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadThing = {
  Uploader: generateUploader<OurFileRouter>(),
  UploadButton: generateUploadButton<OurFileRouter>(),
  UploadDropzone: generateUploadDropzone<OurFileRouter>(),
};

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
