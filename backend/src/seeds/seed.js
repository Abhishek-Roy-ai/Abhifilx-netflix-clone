import bcrypt from 'bcryptjs'
import { db } from '../config/db.js'

async function runSeed() {
  console.log('🌱 Starting Database Seeding with Unsplash Global CDN Assets...')

  // Clear existing
  db.data.users = []
  db.data.profiles = []
  db.data.media = []
  db.data.myList = []
  db.data.watchHistory = []

  // Create default test user
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash('Password123!', salt)
  const defaultUser = {
    id: 'user_default_demo',
    email: 'user@netflix.com',
    passwordHash,
    createdAt: new Date().toISOString()
  }
  db.data.users.push(defaultUser)

  // Default Profiles
  const profiles = [
    {
      id: 'prof_default_adult',
      userId: 'user_default_demo',
      name: 'Alex',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
      isKids: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'prof_default_kids',
      userId: 'user_default_demo',
      name: 'Kids',
      avatar: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" rx="12" fill="%23EAB308"/><circle cx="33" cy="38" r="7" fill="%2318181B"/><circle cx="67" cy="38" r="7" fill="%2318181B"/><path d="M 28 55 Q 50 80 72 55" fill="none" stroke="%2318181B" stroke-width="7" stroke-linecap="round"/></svg>',
      isKids: true,
      createdAt: new Date().toISOString()
    }
  ]
  db.data.profiles.push(...profiles)

  // Seed Media Dataset with Official TMDB CDN Image Assets
  const sampleMedia = [
    {
      id: 'm1',
      tmdbId: 66732,
      title: 'Stranger Things',
      type: 'series',
      description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
      backdropUrl: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      releaseYear: 2024,
      rating: 'TV-14',
      duration: '4 Seasons',
      genres: ['Sci-Fi', 'Horror', 'Drama'],
      tags: ['Suspenseful', 'Nostalgic', 'Scary'],
      cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
      isOriginal: true,
      isTop10: true,
      matchScore: 98
    },
    {
      id: 'm2',
      tmdbId: 93405,
      title: 'Squid Game',
      type: 'series',
      description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
      backdropUrl: 'https://image.tmdb.org/t/p/original/2meX1nMdScFOoV4370rqHWKmXhY.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=oqxAJKy0ii4',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      releaseYear: 2024,
      rating: 'TV-MA',
      duration: '2 Seasons',
      genres: ['Thriller', 'Drama', 'Action'],
      tags: ['Suspenseful', 'Dark', 'Mind-bending'],
      cast: ['Lee Jung-jae', 'Park Hae-soo', 'Wi Ha-jun'],
      isOriginal: true,
      isTop10: true,
      matchScore: 96
    },
    {
      id: 'm3',
      tmdbId: 157336,
      title: 'Interstellar',
      type: 'movie',
      description: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
      backdropUrl: 'https://image.tmdb.org/t/p/original/5XNQBqnBwPA9yT0jZ0p3s8bbLh0.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      releaseYear: 2014,
      rating: 'PG-13',
      duration: '2h 49m',
      genres: ['Sci-Fi', 'Adventure', 'Drama'],
      tags: ['Mind-Bending', 'Visually Stunning', 'Emotional'],
      cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
      isOriginal: false,
      isTop10: true,
      matchScore: 99
    },
    {
      id: 'm4',
      tmdbId: 27205,
      title: 'Inception',
      type: 'movie',
      description: 'Cobb, a skilled thief who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a C.E.O.',
      backdropUrl: 'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      releaseYear: 2010,
      rating: 'PG-13',
      duration: '2h 28m',
      genres: ['Action', 'Sci-Fi', 'Adventure'],
      tags: ['Mind-Bending', 'High-Octane', 'Thriller'],
      cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
      isOriginal: false,
      isTop10: true,
      matchScore: 97
    },
    {
      id: 'm5',
      tmdbId: 119051,
      title: 'Wednesday',
      type: 'series',
      description: 'Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.',
      backdropUrl: 'https://image.tmdb.org/t/p/original/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=Q73UhUTs6y0',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
      releaseYear: 2023,
      rating: 'TV-14',
      duration: '1 Season',
      genres: ['Comedy', 'Fantasy', 'Mystery'],
      tags: ['Witty', 'Dark', 'Eccentric'],
      cast: ['Jenna Ortega', 'Gwendoline Christie', 'Riki Lindhome'],
      isOriginal: true,
      isTop10: true,
      matchScore: 95
    },
    {
      id: 'm6',
      tmdbId: 1399,
      title: 'Game of Thrones',
      type: 'series',
      description: 'Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war.',
      backdropUrl: 'https://image.tmdb.org/t/p/original/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=gcTkNV5Vg1E',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      releaseYear: 2019,
      rating: 'TV-MA',
      duration: '8 Seasons',
      genres: ['Action', 'Fantasy', 'Drama'],
      tags: ['Epic', 'Violence', 'Political'],
      cast: ['Emilia Clarke', 'Kit Harington', 'Peter Dinklage'],
      isOriginal: false,
      isTop10: true,
      matchScore: 94
    },
    {
      id: 'm7',
      tmdbId: 299536,
      title: 'Avengers: Infinity War',
      type: 'movie',
      description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
      backdropUrl: 'https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=6ZfuNTqbHE8',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      releaseYear: 2018,
      rating: 'PG-13',
      duration: '2h 29m',
      genres: ['Action', 'Sci-Fi', 'Adventure'],
      tags: ['Superhero', 'Action-Packed', 'Blockbuster'],
      cast: ['Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo'],
      isOriginal: false,
      isTop10: true,
      matchScore: 96
    },
    {
      id: 'm8',
      tmdbId: 447365,
      title: 'Guardians of the Galaxy Vol. 3',
      type: 'movie',
      description: 'Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own.',
      backdropUrl: 'https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg',
      posterUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      trailerUrl: 'https://www.youtube.com/watch?v=u3V5KDHRQvk',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      releaseYear: 2023,
      rating: 'PG-13',
      duration: '2h 30m',
      genres: ['Action', 'Sci-Fi', 'Comedy'],
      tags: ['Funny', 'Heartfelt', 'Cosmic'],
      cast: ['Chris Pratt', 'Zoe Saldana', 'Dave Bautista'],
      isOriginal: false,
      isTop10: false,
      matchScore: 93
    }
  ]

  db.data.media.push(...sampleMedia)

  // Seed default My List and Watch History for demo user
  db.data.myList.push({
    id: 'list_demo_1',
    profileId: 'prof_default_adult',
    mediaId: 'm1',
    addedAt: new Date().toISOString()
  })

  db.data.watchHistory.push({
    id: 'wh_demo_1',
    profileId: 'prof_default_adult',
    mediaId: 'm3',
    progressSeconds: 3450,
    totalSeconds: 10140,
    lastWatchedAt: new Date().toISOString()
  })

  db.save()
  console.log('✅ Database Seeding Completed with Unsplash Global CDN Assets!')
}

runSeed().catch(console.error)
