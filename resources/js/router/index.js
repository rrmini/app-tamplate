import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import Middlewares from '../middlewares/'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/pages/Dashboard.vue'),
                meta: {
                    middleware: [Middlewares.auth]
                }
            },
            {
                path: '/profile',
                name: 'profile',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/pages/Profile.vue'),
                meta: {
                    middleware: [Middlewares.auth]
                }
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue'),
        meta: {
            middleware: [Middlewares.guest]
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/auth/Register.vue'),
        meta: {
            middleware: [Middlewares.guest]
        }
    },
    {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: () => import(/* webpackChunkName: "login" */ '../views/auth/ForgotPassword.vue'),
        meta: {
            middleware: [Middlewares.guest]
        }
    },
    {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: () => import(/* webpackChunkName: "resetPassword" */ '../views/auth/ResetPassword.vue'),
        meta: {
            middleware: [Middlewares.guest]
        }
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL)
})

function nextCheck(context, middleware, index) {
    const nextMiddleware = middleware[index];

    if (!nextMiddleware) return context.next;

    return (...parameters) => {
        context.next(...parameters);
        const nextMidd = nextCheck(context, middleware, index + 1);

        nextMiddleware({...context, next: nextMidd});
    }
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

        const ctx = {
            from,
            next,
            router,
            to
        };

        const nextMiddleware = nextCheck(ctx, middleware, 1);

        return middleware[0]({...ctx, next: nextMiddleware});
    }

    return next();
});

export default router;
