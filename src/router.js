import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Quiz from './views/Quiz.vue'
import Rank from './views/Rank.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import firebase from 'firebase/app'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        requiresGuest: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

// Nav Guards

router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT logged in
    if (!firebase.auth().currentUser) {
      // go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // proceed to the route (authenticated pages)
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if is logged in
    if (firebase.auth().currentUser) {
      // go to dashboard
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // proceed to the route (login/register)
      next();
    }
  } else {
    // proceed to route
  }
})

export default router;