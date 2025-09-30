import { storage } from '../firebase'
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'

export default async function uploadFiletoFirebase(file) {
  try {
    // Upload image.
    const fileRef = ref(storage, 'files/' + file.name)
    const uploadFile = await uploadBytes(fileRef, file)
    console.log(uploadFile)

    // Get the image URL.
    const url = await getDownloadURL(fileRef)
    return url
  } catch (error) {
    console.log(error)
  }
}
