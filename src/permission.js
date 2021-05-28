import NProgress from "nprogress";
import { getToken } from "@/utils/auth";
import { addRoutes } from "@/utils";
import getAsyncRouter from "@/router/async-router";
import router, { constantLength } from "@/router";
import store from "@/store";
import storage from "store";

const whiteList = ["/user/login"];
const loginRoutePath = "/user/login";
const defaultRoutePath = "/dashbord";

router.beforeEach((to, from, next) => {
  NProgress.start({ showSpinner: false });
  if (getToken()) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath });
    } else {
      const roles = storage.get("roles");
      if (router.getRoutes().length <= constantLength) {
        store
          .dispatch("permission/GenerateRoutes", roles)
          .then((res) => {
            // addRoutes(router, getAsyncRouter(res));
            router.addRoutes(getAsyncRouter(res));
            next({ path: to.path });
          })
          .catch(() => {
            store.dispatch("user/Logout").then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } });
            });
          });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } });
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
