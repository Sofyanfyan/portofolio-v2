import { QueryConstraint, Timestamp, collection, doc, getDoc, getDocs, query } from 'firebase/firestore'

import { firestore } from '@/common/libs/firebase'

function serializeFirestoreValue(value: unknown): unknown {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString()
  }

  if (Array.isArray(value)) {
    return value.map(serializeFirestoreValue)
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, serializeFirestoreValue(nestedValue)])
    )
  }

  return value
}

export function serializeFirestoreDocument<T>(id: string, data: Record<string, unknown>): T {
  const serializedData = serializeFirestoreValue(data) as Record<string, unknown>

  return {
    id,
    ...serializedData
  } as T
}

export async function getCollectionDocuments<T>(
  collectionName: string,
  ...constraints: QueryConstraint[]
): Promise<T[]> {
  const collectionRef = collection(firestore, collectionName)
  const collectionQuery = constraints.length ? query(collectionRef, ...constraints) : collectionRef
  const snapshot = await getDocs(collectionQuery)

  return snapshot.docs.map(item => serializeFirestoreDocument<T>(item.id, item.data()))
}

export async function getDocumentData<T>(collectionName: string, documentId: string): Promise<T | null> {
  const documentRef = doc(firestore, collectionName, documentId)
  const snapshot = await getDoc(documentRef)

  if (!snapshot.exists()) {
    return null
  }

  return serializeFirestoreDocument<T>(snapshot.id, snapshot.data())
}
