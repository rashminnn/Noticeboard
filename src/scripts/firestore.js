import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { ref, deleteObject } from 'firebase/storage'

export async function addNotice(data) {
  try {
    const collectionRef = collection(db, 'currentNotices')
    const addedDocRef = await addDoc(collectionRef, data)
    return addedDocRef
  } catch (error) {
    console.log(error)
  }
}

export async function removeNotice(data) {
  console.log({ data })
  const id = data.id

  const removedNotice = {
    ...data,
    removedAt: new Date().toISOString(),
  }

  delete removedNotice.id

  try {
    const currentNoticesRef = collection(db, 'currentNotices')
    const removedCollectionRef = collection(db, 'pastNotices')

    const addedDocRef = await addDoc(removedCollectionRef, removedNotice)

    const currentNoticeRef = doc(currentNoticesRef, id)
    await deleteDoc(currentNoticeRef)
    return addedDocRef
  } catch (error) {
    console.log(error)
  }
}

export async function deleteNotice(id, fileUrl) {
  const storageRef = ref(storage, fileUrl)
  await deleteObject(storageRef)

  const removedCollectionRef = collection(db, 'pastNotices')
  await deleteDoc(doc(removedCollectionRef, id))
}
