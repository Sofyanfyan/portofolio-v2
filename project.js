#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires, no-console */

const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { initializeApp } = require('firebase/app')
const { collection, doc, getDocs, getFirestore, limit, query, writeBatch } = require('firebase/firestore')

const COLLECTION_NAME = 'projects'
const BATCH_LIMIT = 450

const PROJECTS = [
  {
    title: 'Portfolio',
    slug: 'portfolio',
    description: 'Personal website starter.',
    image: 'https://...',
    link_demo: 'https://...',
    link_github: 'https://github.com/...',
    stacks: ['Next.js', 'Tailwind CSS', 'Firestore'],
    is_show: true,
    is_featured: true
  }
]

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/)

  for (const line of lines) {
    const trimmedLine = line.trim()
    if (!trimmedLine || trimmedLine.startsWith('#')) continue

    const separatorIndex = trimmedLine.indexOf('=')
    if (separatorIndex === -1) continue

    const key = trimmedLine.slice(0, separatorIndex).trim()
    let value = trimmedLine.slice(separatorIndex + 1).trim()

    if (!key || process.env[key]) continue

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    process.env[key] = value
  }
}

function getFirebaseConfig() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  }

  const missingKeys = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missingKeys.length > 0) {
    throw new Error(`Firebase config belum lengkap. Missing: ${missingKeys.join(', ')}`)
  }

  return firebaseConfig
}

function validateProjects(projects) {
  const errors = []
  const slugs = new Set()

  if (!Array.isArray(projects)) {
    throw new Error('PROJECTS harus berupa array.')
  }

  if (projects.length === 0) {
    throw new Error('PROJECTS masih kosong. Isi data project terlebih dahulu sebelum menjalankan script ini.')
  }

  projects.forEach((project, index) => {
    const label = `PROJECTS[${index}]`

    for (const field of ['title', 'slug', 'description', 'image']) {
      if (typeof project[field] !== 'string' || project[field].trim() === '') {
        errors.push(`${label}.${field} wajib diisi string.`)
      }
    }

    for (const field of ['link_demo', 'link_github']) {
      if (!(field in project)) {
        errors.push(`${label}.${field} wajib ada. Isi string kosong atau null jika tidak ada.`)
      } else if (project[field] !== null && typeof project[field] !== 'string') {
        errors.push(`${label}.${field} harus string atau null.`)
      }
    }

    if (!Array.isArray(project.stacks) || project.stacks.length === 0) {
      errors.push(`${label}.stacks wajib berupa array string dan minimal 1 item.`)
    } else if (project.stacks.some(stack => typeof stack !== 'string' || stack.trim() === '')) {
      errors.push(`${label}.stacks hanya boleh berisi string non-kosong.`)
    }

    for (const field of ['is_show', 'is_featured']) {
      if (typeof project[field] !== 'boolean') {
        errors.push(`${label}.${field} wajib boolean.`)
      }
    }

    if (typeof project.slug === 'string') {
      if (project.slug.includes('/')) {
        errors.push(`${label}.slug tidak boleh mengandung "/".`)
      }

      if (slugs.has(project.slug)) {
        errors.push(`${label}.slug duplikat: ${project.slug}.`)
      }

      slugs.add(project.slug)
    }
  })

  if (errors.length > 0) {
    throw new Error(`Data project tidak valid:\n- ${errors.join('\n- ')}`)
  }
}

function confirmDestructiveRun() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise(resolve => {
    rl.question(`Ketik DELETE_${COLLECTION_NAME.toUpperCase()} untuk menghapus dan seed ulang collection: `, answer => {
      rl.close()
      resolve(answer === `DELETE_${COLLECTION_NAME.toUpperCase()}`)
    })
  })
}

async function deleteProjects(db) {
  let deletedCount = 0
  let hasMoreDocuments = true

  while (hasMoreDocuments) {
    const snapshot = await getDocs(query(collection(db, COLLECTION_NAME), limit(BATCH_LIMIT)))

    if (snapshot.empty) {
      hasMoreDocuments = false
      break
    }

    const batch = writeBatch(db)
    snapshot.docs.forEach(documentSnapshot => {
      batch.delete(documentSnapshot.ref)
    })

    await batch.commit()
    deletedCount += snapshot.size
    console.log(`Deleted ${deletedCount} document(s) from "${COLLECTION_NAME}"...`)
  }

  return deletedCount
}

async function seedProjects(db, projects) {
  let createdCount = 0

  for (let index = 0; index < projects.length; index += BATCH_LIMIT) {
    const batch = writeBatch(db)
    const chunk = projects.slice(index, index + BATCH_LIMIT)

    chunk.forEach(project => {
      batch.set(doc(db, COLLECTION_NAME, project.slug), project)
    })

    await batch.commit()
    createdCount += chunk.length
    console.log(`Seeded ${createdCount} project document(s)...`)
  }

  return createdCount
}

async function main() {
  loadEnvFile(path.join(process.cwd(), '.env'))
  validateProjects(PROJECTS)

  const isDryRun = process.argv.includes('--dry-run')
  const isConfirmed = process.argv.includes('--yes')

  if (isDryRun) {
    console.log(`Dry run OK. ${PROJECTS.length} project document(s) are valid.`)
    return
  }

  if (!isConfirmed) {
    const approved = await confirmDestructiveRun()

    if (!approved) {
      console.log('Dibatalkan. Tidak ada data Firestore yang diubah.')
      return
    }
  }

  const app = initializeApp(getFirebaseConfig())
  const db = getFirestore(app)

  const deletedCount = await deleteProjects(db)
  const createdCount = await seedProjects(db, PROJECTS)

  console.log(`Selesai. Deleted: ${deletedCount}. Created: ${createdCount}.`)
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
