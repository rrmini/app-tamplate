import { createRouter, createWebHistory } from "vue-router";
import App from '../views/App.vue'
import AppLayout from '../views/layouts/AppLayout.vue';
import AuthLayout from "../views/layouts/AuthLayout.vue";
import Middlewares from '../middlewares/'
import Home from "../views/pages/Home.vue";

const routes = [
    {
        path: '/',
        name: 'main',
        component: App,
        children: [

            {
                path: '/',
                component: AuthLayout,
                children: [
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
                ],
            },

            {
                path: '/',
                name: 'app',
                component: AppLayout,
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
        ]
    },
]

const router = createRouter({

    history: createWebHistory(import.meta.env.BASE_URL),
    routes
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
