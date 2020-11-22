export default () => {
  return {
    head: {
      title: 'nuxt-firebase-demo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    hooks: {
      generate: {
        async done(builder) {
          // This makes sure nuxt generate does finish without running into a timeout issue.
          // See https://github.com/nuxt-community/firebase-module/issues/93
          const appModule = await import('./.nuxt/firebase/app.js')
          const { session } = await appModule.default(
            builder.options.firebase.config,
            {
              res: null,
            }
          )
          try {
            session.database().goOffline()
          } catch (e) {}
          try {
            session.firestore().terminate()
          } catch (e) {}
        },
      },
    },

    components: true,

    buildModules: [
      '@nuxt/typescript-build',
      '@nuxtjs/tailwindcss',
      '@nuxtjs/firebase',
    ],

    firebase: {
      lazy: false,
      config: {
        apiKey: 'AIzaSyDuUYLpHKboQTjX7O1wxLj1031e8d2RXmk',
        authDomain: 'kanzlei-bf.firebaseapp.com',
        databaseURL: 'https://kanzlei-bf.firebaseio.com',
        projectId: 'kanzlei-bf',
        storageBucket: 'kanzlei-bf.appspot.com',
        messagingSenderId: '727262562759',
        appId: '1:727262562759:web:0eb43f4e8a12d88da731e2',
        measurementId: 'G-6TTNY63VNL',
        // fcmPublicVapidKey:
        //   'BL_xoiuOe5vbb2vJkCNnuswn03NwCsyCkJUgRbuQA5tpg7J4E4z50MO8b-wrrad6fcysYAaFjHqU7D9o0oCWL8w',
      },
      onFirebaseHosting: false,
      services: {
        auth: {
          initialize: {
            onAuthStateChangedAction: 'onAuthStateChanged',
          },
          ssr: true,
          // emulatorPort: process.env.NODE_ENV === 'development' ? 9099 : false,
        },
        firestore: {
          memoryOnly: false,
          // emulatorPort: process.env.NODE_ENV === 'development' ? 8080 : false,
        },
        functions: {
          // emulatorPort: process.env.NODE_ENV === 'development' ? 12345 : false,
        },
        storage: true,
        database: {
          // emulatorPort: process.env.NODE_ENV === 'development' ? 9000 : false,
        },
        performance: true,
        analytics: true,
        remoteConfig: {
          settings: {
            fetchTimeoutMillis: 60000,
            minimumFetchIntervalMillis: 43200000,
          },
          defaultConfig: {
            welcome_message: 'Welcome',
          },
        },
        messaging: {
          createServiceWorker: true,
          actions: [
            {
              action: 'goToLupasGithub',
              url: 'https://github.com/lupas',
            },
            {
              action: 'goToModuleGithub',
              url: 'https://github.com/nuxt-community/firebase-module',
            },
          ],
        },
      },
    },

    modules: ['@nuxtjs/pwa'],
    // plugins: ['~/plugins/lazyMode'],

    build: {},

    /*
     ** Nuxt.js Middleware
     */
    router: {
      // middleware: ['testMiddleware'],
      middleware: 'router-auth'
    },

    pwa: {
      workbox: {
        importScripts: ['/firebase-auth-sw.js'],
        // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
        // only set this true for testing and remember to always clear your browser cache in development
        dev: process.env.NODE_ENV === 'development',
      },
    },
  }
}
