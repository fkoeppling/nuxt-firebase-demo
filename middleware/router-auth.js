export default function({ app, store, redirect, route }) {
  // store.state.user != null && route.name == 'login' ? redirect('/dashboard') : ''
  // store.state.user == null && isAdminRoute(route) ? redirect('/login') : ''
  console.log('Hallo');
	app.$fire.auth != null && route.name == 'login' ? redirect('/dashboard') : ''
  app.$fire.auth == null && isAdminRoute(route) ? redirect('/login') : ''
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path == '/dashboard')) {
    return true
  }
}
