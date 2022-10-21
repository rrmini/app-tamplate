import { createStore} from 'vuex'
import user from "./user";
import application from "./application";

export const store = createStore({
  modules: {
      user,
      application,
  },
    strict: import.meta.env.APP_DEBUG
})
